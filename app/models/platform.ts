class Platform
{
    public id: string | undefined;
    public name: string;

    constructor(name: string)
    {
        this.id = crypto.randomUUID();
        this.name = name;
    }
}

export {
    Platform
}