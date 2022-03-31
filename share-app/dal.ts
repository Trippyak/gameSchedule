import { encodeBase64url } from "./imports.ts";

const twentyFourHours = 86400000; // milliseconds
const oneYear = 31536000000; // milliseconds

const createShare = async (db: any, payload: any): Promise<string> => {
    const {expire, userID, ...content}: {expire: string, userID: string, content: any[]} = payload;
    const token = encodeBase64url(
        new Uint8Array(
            await crypto.subtle.digest("SHA-256", new TextEncoder().encode(JSON.stringify({expire, userID, content})))
        )
    );

    const date = new Date();
    const now = new Date(date.getFullYear(), date.getMonth() + 1, date.getDate(), 0, 0, 0, 0);
    const requestedExpire = new Date(expire);
    let diff = (requestedExpire.getTime() - now.getTime());
    
    if (diff <= 0 || diff > oneYear)
        diff = twentyFourHours;

    // convert to seconds
    diff /= 1000;

    await db.set(token, JSON.stringify(content));
    await db.expire(token, diff);
    return token;
}

const loadShare = async (db: any, token: string): Promise<any> => {
    if ((await db.exists(token)) === 0)
        return {
            error: `${token} does not exist or expired`
        }
    
    const content = await db.get(token);
    return content;
}

export {
    createShare
    , loadShare
}