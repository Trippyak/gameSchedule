#!/bin/bash
set -e
export PGPASSWORD=$POSTGRES_PASSWORD;
psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
  BEGIN;
    CREATE TABLE IF NOT EXISTS games(
        id CHAR(36) NOT NULL CHECK (CHAR_LENGTH(id) = 36) PRIMARY KEY,
        name VARCHAR(50) NOT NULL,
        platform VARCHAR(10) NOT NULL,
        CONSTRAINT u_np_games UNIQUE(name, platform)
    );
    
    CREATE INDEX idx_game_name ON games (id);

    CREATE TABLE IF NOT EXISTS schedules(
        id CHAR(36) NOT NULL CHECK (CHAR_LENGTH(id) = 36) PRIMARY KEY,
        year INT NOT NULL,
        month INT NOT NULL,
        day INT NOT NULL,
        time INT NOT NULL,
        CONSTRAINT u_ymdt_schedules UNIQUE(year, month, day, time)
    );
	
    CREATE TABLE IF NOT EXISTS scheduled_games(
        id CHAR(36) NOT NULL CHECK (CHAR_LENGTH(id) = 36) PRIMARY KEY,
        user_id CHAR(36) NOT NULL,
        game_id CHAR(36) NOT NULL,
        schedule_id CHAR(36) NOT NULL,
        UNIQUE(user_id, game_id, schedule_id),
        CONSTRAINT fk_game
            FOREIGN KEY(game_id)
                REFERENCES games(id),
        CONSTRAINT fk_schedule
            FOREIGN KEY(schedule_id)
                REFERENCES schedules(id)
    );
  COMMIT;
EOSQL