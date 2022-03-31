<script>
    import { formateTimeFromMilitary } from "../../Utilities/Formatters.svelte";
    import DeleteButton from "../DeleteButton/DeleteButton.svelte";

    export let gameInfo;
    export let allowMouseOver;

    let date = new Date();
    let mouseOver = false;

    const onMouseOver = () => mouseOver = true;
    const onMouseLeave = () => mouseOver = false;
</script>

<div class={date.getDate() === gameInfo.schedule.day ? "generic-container today-container" : "generic-container"}
    on:mouseenter={onMouseOver} on:mouseleave={onMouseLeave}>
    <p>{gameInfo.schedule.month}/{gameInfo.schedule.day}</p>
    <p>{gameInfo.game.name}</p>
    <b><p>@{formateTimeFromMilitary(gameInfo.schedule.time)}</p></b>
    <p>{gameInfo.game.platform}</p>
    <div>
        {#if mouseOver}
            <DeleteButton scheduleID={gameInfo.id} {allowMouseOver} on:delete/>
        {/if}
    </div>
</div>

<style>
    .generic-container {
        display: grid;
        grid-template-columns: auto auto auto auto auto;
        background-color: rgb(86, 86, 251);
        margin: 1em 1em 0em 1em;
        border-bottom: 5px solid black;
    }

    .today-container {
        border-left: 10px solid rgb(141, 141, 255);
    }

    p {
        color: white;
        margin-left: 5px;
        margin-right: 5px;
    }
</style>