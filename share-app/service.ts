import { createShare, loadShare } from "./dal.ts";

class Service
{
    public db: any;
    
    constructor(db: any)
    {
        this.db = db;
    }

    public async createShare(payload: any): Promise<string>
    {
        return await createShare(this.db, payload);
    }

    public async loadShare(token: string): Promise<any>
    {
        return await loadShare(this.db, token);
    }
}

export {
    Service
}