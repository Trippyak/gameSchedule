class Game
{
    public id: string | undefined;
    public name: string;
    public platform: string;

    constructor(name: string, platform: string)
    {
        this.id = crypto.randomUUID();
        this.name = name;
        this.platform = platform;
    }
}

export {
    Game
}