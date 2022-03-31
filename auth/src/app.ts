const express = require("express");

import { sign, verify } from "jsonwebtoken";
import {  Client } from "./imports";
import { User } from "./models/user";
import { Service } from "./service";


const port = 3000;

const app = express();
const router = express.Router();
const service = new Service(new Client({
    user: "postgres"
    , password: "postgres"
    , database: "auth"
    , host: "auth-postgres"
    , port: 5432
  }));

router
    .post("/account/create", async (req: any, res: any) => {
        const { name, password } = req.body;
        const payload = await service.createUser(name, password)
        res.status(200).send(payload);
    })
    .post("/account/login", async (req: any, res: any) => {
        const { name, password } = req.body;
        const payload = await service.login(name, password);
        
        if(payload instanceof User)
        {    
            const {id, hash} = payload;
            const token = sign({id, hash}, "apples");
            res.set({
                    authorization: `Bearer ${token}`
            });
        }
        
        res.status(200).send(payload);
    })
    .get("/account/authorize", async (req: any, res: any) => {
        try
        {
            const token = req.get("Authorization").split(' ')[1];
            const { id, hash }: any = verify(token, "apples");   
            const payload = await service.authorize(id, hash);
            res.status(200).send(payload);
        }
        catch
        {
            res.status(200).send({
                authorize: false
            });
        }
    });


app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use("/api", router);

app.listen(port);

(async () => {
    await service.db.connect();
})();