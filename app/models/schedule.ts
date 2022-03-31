class Schedule
{
    public id: string | undefined;
    public year: number;
    public month: number;
    public day: number;
    public time: number;

    constructor(year: number, month: number, day: number, time: number){
        this.id = crypto.randomUUID();
        this.year = year;
        this.month = month;
        this.day = day;
        this.time = time;
    }
}

export {
    Schedule
}