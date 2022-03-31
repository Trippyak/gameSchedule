<script>
    import { formateTimeFromMilitary } from "../../Utilities/Formatters.svelte";
    import DeleteButton from "../DeleteButton/DeleteButton.svelte";

    export let day;
    export let isCurrentDay = false;
    export let info;
    export let inMonth = false;
    export let allowMouseOver = false;

    let mouseOver = false;


    const onMouseEnter = () => {
        if (info)
            mouseOver = true && allowMouseOver;
    }

    const onMouseLeave = () => {
        mouseOver = false;
    }

</script>

<div class="in-month" on:mouseenter={onMouseEnter} on:mouseleave={onMouseLeave}>
    {#if inMonth}
        <div class={isCurrentDay ? "current" : "header"}>
            <h3>{day}</h3>
        </div>
        <div class="center">
            <div class="content">
                {#if info}
                    {#if mouseOver}
                        <DeleteButton scheduleID={info.id} topRight={true} on:delete/>
                    {/if}
                    <p>{info.game.name}</p>
                    <b><p>@{formateTimeFromMilitary(info.schedule.time)}</p></b>
                    <p>{info.game.platform}</p>
                {/if}
            </div>
        </div>
    {/if}
</div>

<style>
    .in-month {
        width: 230px;
        height: 230px;
        background-color: rgb(86, 86, 251);
        margin: 1em;
    }

    .current {
        background-color: rgb(141, 141, 255);
    }

    .header {
        background-color: rgb(50, 50, 189);
    }

    .center {
        width: 80%;
        height: 70%;
        margin: auto;
    }

    .content {
        display: grid;
        position: relative;
        background-color: rgb(141, 141, 255);
        align-items: center;
        justify-content: center;
        height: 100%;
        margin: 10% 0 0 0;
        overflow-x: auto;
        overflow-y: auto;
    }

    h3 {
        color: white;
        margin: 0;
        padding: 0;
    }

    p {
        margin: 0px;
        padding: 0px;
    }

    @media (max-width: 1640px) {
        .in-month {
            width: 150px;
            height: 150px;
        }
    }
</style>