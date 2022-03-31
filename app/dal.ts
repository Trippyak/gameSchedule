import { ScheduledGame } from "./models/scheduledGame.ts"

const createScheduledGame = async (db: any, scheduledGame: ScheduledGame): Promise<{id: string | undefined} | {error: string}> => {
    const { userID } = scheduledGame;
    const { game, schedule } = scheduledGame;
    const { year, month, day, time } = schedule;
    const errorResponse = {error: `Game already scheduled for ${month}/${day}/${year}`};
    
    const existingGameID = await db.queryObject(
        `SELECT id FROM games WHERE name = '${game.name}' AND platform = '${game.platform}'`
    );

    if (existingGameID.rows.length === 1)
        game.id = existingGameID.rows[0].id;
    else
        await db.queryObject(
            `
            INSERT INTO games (id, name, platform) VALUES ('${game.id}', '${game.name}', '${game.platform}')
                ON CONFLICT ON CONSTRAINT u_np_games
                DO NOTHING;
            `
        );
    
    const existingScheduledGameOnDayForUser = await db.queryObject(
        `
        SELECT
            sg.id
        FROM scheduled_games sg
            inner join schedules s
                on sg.schedule_id = s.id
        WHERE sg.user_id = '${userID}'
        AND s.year = ${year} AND s.month = ${month} AND s.day = ${day};
        `
    );

    if (existingScheduledGameOnDayForUser.rows.length >= 1)
        return errorResponse;

    const existingScheduleID = await db.queryObject(
        `
        SELECT * FROM schedules WHERE year = ${year} AND month = ${month} AND day = ${day} AND time = ${time};
        `
    );

    if (existingScheduleID.rows.length === 1)
        schedule.id = existingScheduleID.rows[0].id;
    else
        await db.queryObject(
            `
            INSERT INTO schedules (id, year, month, day, time) VALUES ('${schedule.id}', ${year}, ${month}, ${day}, ${time});
            `
        );
                
    try
    {
        await db.queryObject(
            `
            INSERT INTO scheduled_games (id, user_id, game_id, schedule_id) VALUES ('${scheduledGame.id}', '${userID}', '${game.id}', '${schedule.id}');
            `
            );
            
        return {
            id: scheduledGame.id
        }
    }
    catch
    {
        return errorResponse;
    }
}

const filterGames = async (db: any, filter: any): Promise<any> => {
    const today = new Date();
    const { game, platform, date } = filter;
    let [ year, month, day ] = date?.split('-') ?? [today.getFullYear(), today.getMonth() + 1, undefined];
    let query = `
            SELECT
                sg.id AS scheduled_game_id
                , sg.user_id AS user_id
                , g.id AS game_id
                , g.name AS game_name
                , g.platform AS platform
                , s.id AS schedule_id
                , s.year AS year
                , s.month AS month
                , s.day AS day
                , s.time AS time
            FROM scheduled_games sg
                inner join games g
                    on sg.game_id = g.id
                inner join schedules s
                    on sg.schedule_id = s.id
            where 1=1
            AND sg.user_id = '${filter.userID}'
    `
    
    query = year ? `${query} and s.year = ${year}` : query += "";
    query = month ? `${query} and s.month = ${month}`: query += "";
    query = game ? `${query} and g.name like '%${game}%'` : query += "";
    query = platform ? `${query} and g.platform = '${platform}'` : query += "";
    query += ";";
 
    return await db.queryObject(query);
}

const deleteScheduledGame = async (db: any, scheduleID: string): Promise<{success: boolean} | {error: string}> => {
    try
    {
        await db.queryObject(
            `
            DELETE
            FROM scheduled_games
            WHERE id = '${scheduleID}';
            `
        );

        return {
            success: true
        }
    }
    catch(err)
    {
        return {error: err.mesage}
    }
}

export {
    createScheduledGame
    , filterGames
    , deleteScheduledGame
}