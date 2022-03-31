import { User } from "./models/user"

const createUser = async (db: any, user: User) => {

    try
    {
        await db.query(
            `
            INSERT INTO users (id, name, hash) VALUES ('${user.id}', '${user.name}', '${user.hash}');
            `
        )

        return {
            id: user.id
        }
    }
    catch
    {
        return {
            error: "User account already exists"
        };
    }
}

const getUserByName = async (db: any, name: string) => {
    try
    {
        const foundUser = await db.query(
            `
            SELECT * FROM users WHERE name = '${name}';
            `
        );

        if (foundUser.rows.length === 1)
        {
            const {id, name, hash} = foundUser.rows[0];
            const user = new User(name, hash);
            user.id = id;
            return user;            
        }
        else
            return {
                error: "Invalid user credentials"
            }
    }
    catch
    {
        return {
            error: "Invalid user credentials"
        }
    }
}

const getUserByID = async (db: any, id: string) => {
    try
    {
        const foundUser = await db.query(
            `
            SELECT * FROM users WHERE id = '${id}';
            `
        );

        if (foundUser.rows.length === 1)
        {
            const {id, name, hash} = foundUser.rows[0];
            const user = new User(name, hash);
            user.id = id;
            return user;            
        }
        else
            return {
                error: "Invalid user credentials"
            }
    }
    catch
    {
        return {
            error: "Invalid user credentials"
        }
    }
}

export {
    createUser
    , getUserByName
    , getUserByID
}