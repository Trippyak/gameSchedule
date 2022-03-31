import { bcrypt } from "./imports";
import { User } from "./models/user";
import { createUser, getUserByName, getUserByID } from "./dal";

class Service
{
    public db: any;
    
    constructor(db: any)
    {
        this.db = db;
    }

    public async createUser(name: string, password: string)
    {
        const hash = await bcrypt.hash(password, 8);
        const user = new User(name, hash);
        return await createUser(this.db, user);
    }

    public async login(name: string, password: string)
    {
        const userOrError: User | {error: string} = await getUserByName(this.db, name);
        
        if (!(userOrError instanceof User))
            return userOrError;
        else if (await bcrypt.compare(password, userOrError.hash))
            return userOrError as User;
        
        
        return {
            error: "Invalid user credentials"
        }
    }

    public async authorize(id: string, hash: string)
    {
        const userOrError: User | {error: string} = await getUserByID(this.db, id);

        if (!(userOrError instanceof User))
            return userOrError;
        
        if (userOrError.hash === hash)
            return {
                id: userOrError.id
                , hash: userOrError.hash
            };

        return {
            authorize: false
        };
    }
}

export {
    Service
}