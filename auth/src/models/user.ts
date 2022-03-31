import { randomUUID } from "../imports";


class User
{
    id: string;
    name: string;
    hash: string;

    constructor(name: string, hash: string)
    {
        this.id = randomUUID();
        this.name = name;
        this.hash = hash;
    }
}

export {
    User
}