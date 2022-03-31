import { Application, Router, send, helpers } from "https://deno.land/x/oak/mod.ts";

const port = 3000;

const app = new Application();

const routeMap = new Map<string, string>([
    ["gameschedule", `http://app:3000`]
    , ["account", `http://auth:3000`]
    , ["share", `http://share-app:3000`]
]);

app.use(async (ctx, next) => {
    if (ctx.request.url.pathname.includes('.'))
        ctx.response.status = 200;
    
    await next();
});

// /gameSchedule | /share
app
    .use(async (ctx, next) => {
        const {pathname} = ctx.request.url;
        if (pathname.startsWith("/gameschedule") || pathname.startsWith("/share"))
        {
            await ctx.send({
                root: `${Deno.cwd()}/public`
                , index: "index.html"
            });
        }
        else if (pathname.startsWith("/api"))
        {
            await next();
        }
    });
    
// /api/gameSchedule | /api/account | /api/share
app.use(async (ctx) => {
    const { pathname } = ctx.request.url;
    const { method } = ctx.request;
    const route = pathname.split('/')[2];
    const routePath = routeMap.get(route.toLowerCase());
    const authorization = ctx.request.headers.get("Authorization") ?? "";
    const headers = {
        "Content-Type": "application/json"
        , "Authorization": authorization
    }

    if (routePath)
    {
        let res: any;
        if (method === "POST")
        {
            const passThroughPayload = await (ctx.request.body({type: "json"}).value);
            res = await fetch(`${routePath}${pathname}`, {
                method: "POST"
                , headers
                , body: JSON.stringify(passThroughPayload)
            });
            
            if (route === "account")
                ctx.response.headers.set("Authorization", res.headers.get("Authorization") ?? "");

        }
        else if (method === "GET")
        {
            res = await fetch(`${routePath}${pathname}${ctx.request.url.search}`, {
                method: "GET"
                , headers
            }); 
        }

        ctx.response.status = res.status;
        ctx.response.body = await res.json();
    }
    else
        ctx.response.status = 404;
});

app.listen({port});