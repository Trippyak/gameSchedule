import { Game } from "./game.ts";
import { Schedule } from "./schedule.ts";

class ScheduledGame
{
    public id: string | undefined;
    public userID: string | undefined;
    public game: Game;
    public schedule: Schedule;

    constructor(userID: string, game: Game, schedule: Schedule)
    {
        this.id = crypto.randomUUID();
        this.userID = userID;
        this.game = game;
        this.schedule = schedule;
    }
}

export {
    ScheduledGame
}