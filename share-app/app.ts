import { Application, Router, connect, getQuery } from "./imports.ts";
import { Service } from "./service.ts";

const port = 3000;

const app = new Application();
const router = new Router();
let redis = await connect({
            hostname: "share-redis"
            , port: 6379
            , password: "redis"
            , db: 0
        });

const service = new Service(redis);

router
    .post("/api/share/create/", async (ctx) => {
        const auth = await fetch("http://auth:3000/api/account/authorize", {
            method: "GET"
            , headers: {
                "Content-Type": "application/json"
                , "Authorization": ctx.request.headers.get("Authorization") ?? ""
            }
        }).then(res => res.json());
        
        if (!auth.id)
        {
            ctx.response.status = 401;
            return;
        }
        
        const payload = await (ctx.request.body({type: "json"}).value);
        // @ts-ignore
        payload.userID = auth.id;
        const token = await service.createShare(payload);
        ctx.response.body = {
            token
        }
    })
    .get("/api/share/load/:token", async (ctx) => {
        const {token} = ctx.params;
        // @ts-ignore
        const payload = await service.loadShare(token);
        let content;
        if (!payload.error)
        {
            content = JSON.parse(payload);
            // @ts-ignore
            const firstEvent: any = Object.entries(content).find(([key, value]: [key: any, value: any]) => !isNaN(key))[1];
            const {year, month} = firstEvent.schedule;
            content.year = year;
            content.month = month;
        }
        ctx.response.body = content; 
    });

app.use(router.routes());
app.use(router.allowedMethods());

app.listen({port});