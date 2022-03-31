<script context="module">
import { dataset_dev } from "svelte/internal";


    const headers = {
        "Content-Type": "application/json"
        , "Authorization": undefined
    };

    export const createScheduledGame = async (scheduledGame, token) => {
        headers.Authorization = token;
        return await fetch(`/api/gameschedule/create`, {
            method: "POST"
            , headers
            , body: JSON.stringify(scheduledGame)
        }).then(res => res.json());
    }

    export const filterScheduledGames = async (filter, token) => {
        headers.Authorization = token;
        let query = "?";
        for (let entry of Object.entries(filter))
        {
            if (entry[1])
                query += `${entry[0]}=${entry[1]}&`
        }
        const data = await fetch(`/api/gameschedule/filter/${query}`, {headers}).then(res => res.json());
        return new Map(Object.entries(data));
    }

    export const deleteSchedule = async (scheduleID, token) => {
        headers.Authorization = token;
        return fetch("/api/gameSchedule/delete", {
            method: "POST"
            , headers
            , body: JSON.stringify({scheduleID})
        })
        .then(res => res.json());
    }

    const callAPI = async (name, password, mode) => {
        return await fetch(`/api/account/${mode}`, {
            method: "POST"
            , headers
            , body: JSON.stringify({
                name
                , password
            })
        }).then(res => res.json());
    }

    export const login = async (name, password) => {
        const res = await fetch(`/api/account/login`, {
            method: "POST"
            , headers
            , body: JSON.stringify({
                name
                , password
            })
        });
        return res.headers.get("Authorization");
    }

    export const create = async (name, password) => {
        return await callAPI(name, password, "create");
    }

    export const createShare = async (events, expire, authorization) => {
        events.set("expire", expire);
        headers.Authorization = authorization;
        return await fetch("/api/share/create/", {
            method: "POST"
            , headers
            , body: JSON.stringify(Object.fromEntries(events))
        })
        .then(res => res.json());
    }

    export const loadShared = async (token) => {
        return await fetch(`/api/share/load/${token}`, {
            method: "GET"
            , headers
        })
        .then(res => res.json())
        .then(data => new Map(Object.entries(data)));
    }
</script>