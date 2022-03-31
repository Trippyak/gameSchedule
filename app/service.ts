import { Game } from "./models/game.ts";
import { Schedule } from "./models/schedule.ts";
import { ScheduledGame } from "./models/scheduledGame.ts";
import { createScheduledGame, filterGames, deleteScheduledGame } from "./dal.ts";

interface IMapping
{
    [index: number]: ScheduledGame;
}

interface IFilter
{
    userID: string;
    game: string;
    platform: string;
    date: string;
}

class Service
{
    public db: any;
    
    constructor(db: any)
    {
        this.db = db;
    }

    private mapItems(scheduledGames: IMapping, data: any)
    {
        for (const d of data.rows)
        {
            const game = new Game(d.game_name, d.platform)
            game.id = undefined;
            const schedule = new Schedule(d.year, d.month, d.day, d.time);
            schedule.id = undefined;
            const newScheduledGame = new ScheduledGame(d.user_id, game, schedule)
            newScheduledGame.id = d.scheduled_game_id;
            newScheduledGame.userID = undefined;
            scheduledGames[schedule.day] = newScheduledGame
        }
    }

    public async filterScheduledGames(filter: Partial<IFilter>): Promise<IMapping>
    {
        let scheduleGames: IMapping = {};
        const data = await filterGames(this.db, filter);
        this.mapItems(scheduleGames, data);
        return scheduleGames;
    }

    public async createScheduledGame(scheduledGame: any): Promise<{id: string | undefined} | {error: string}>
    {
        const {year, month, day, time} = scheduledGame.schedule;
        const game = new Game(scheduledGame.game.name, scheduledGame.game.platform);
        const schedule = new Schedule(year, month, day, time);
        const newScheduledGame = new ScheduledGame(scheduledGame.userID, game, schedule);
        return await createScheduledGame(this.db, newScheduledGame);
    }

    public async deleteScheduledGame(payload: any): Promise<{success: boolean} | {error: string}>
    {
        const {scheduleID} = payload;
        return await deleteScheduledGame(this.db, scheduleID);
    }
}

export {
    Service
}