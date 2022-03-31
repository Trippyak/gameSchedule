<script>
    import { fade } from "svelte/transition";
    import DayTile from "./DayTile.svelte";
    
    export let events;
    export let month;
    export let daysOfWeek;
    export let maxDays;
    export let offsetArray;
    export let currentDate;
    export let allowMouseOver;
</script>

<h1>{month}</h1>
<div class="container" in:fade out:fade>
    {#each daysOfWeek as dayOfWeek}
        <h4>{dayOfWeek}</h4>
    {/each}
    {#each offsetArray as offset}
        <DayTile inMonth={false}/>
    {/each}
    {#each [...Array(maxDays).keys()] as dMax}
        <DayTile day={dMax + 1} info={events.get(`${dMax + 1}`)} isCurrentDay={dMax + 1 === currentDate} inMonth={true} {allowMouseOver} on:delete/>
    {/each}
    {#each offsetArray as offset}
        <DayTile inMonth={false}/>
    {/each}
</div>

<style>
    .container {
        display: grid;
        grid-template-columns: auto auto auto auto auto auto auto;
        justify-content: center;
    }
</style>