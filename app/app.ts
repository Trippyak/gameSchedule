import { Application, Router, Client, getQuery } from "./imports.ts";
import { Service } from "./service.ts";

const port = 3000;

const app = new Application();
const router = new Router();
const service = new Service(new Client({
    user: "postgres"
    , password: "postgres"
    , database: "gameSchedule"
    , hostname: "app-postgres"
    , port: 5432
  }));

await service.db.connect();

app.use(async (ctx, next) => {
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
        ctx.response.body = auth;
    }
    else
    {
        // @ts-ignore
        ctx.auth = auth;
        await next();
    }
});

router
    .get("/api/gameschedule/filter/", async (ctx) => {
        const filter = getQuery(ctx, {mergeParams: true});
        // @ts-ignore
        filter.userID = ctx.auth.id;
        ctx.response.body = await service.filterScheduledGames(filter);
    })
    .post("/api/gameschedule/create", async (ctx) => {
        const payload = await (ctx.request.body({type: "json"}).value);
        // @ts-ignore
        payload.userID = ctx.auth.id;
        ctx.response.body = await service.createScheduledGame(payload);
    })
    .post("/api/gameSchedule/delete", async (ctx) => {
        const payload = await (ctx.request.body({type: "json"}).value);
        ctx.response.body = await service.deleteScheduledGame(payload);
    });

app.use(router.routes());
app.use(router.allowedMethods());

app.listen({port});