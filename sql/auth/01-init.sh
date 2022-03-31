#!/bin/bash
set -e
export PGPASSWORD=$POSTGRES_PASSWORD;
psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
  BEGIN;
    CREATE TABLE IF NOT EXISTS users(
        id CHAR(36) NOT NULL CHECK (CHAR_LENGTH(id) = 36) PRIMARY KEY,
        name VARCHAR(15) NOT NULL,
        hash VARCHAR NOT NULL,
        UNIQUE(name)
    );
  COMMIT;
EOSQL