<script>
    import { createEventDispatcher } from "svelte";
    import { fade } from "svelte/transition";
    import FilterPlate from "./FilterPlate.svelte";
    
    const dispatch = createEventDispatcher();

    export let events;
    export let isSearch = false;
    export let allowMouseOver;

    const close = () => dispatch("close");
    export const getEvents = () => events;
    export const setEvents = (newEvents) => events = newEvents;
</script>

<div class="container" in:fade out:fade>
    {#if isSearch}
        <button on:click={close}>Close Search</button>
    {/if}
    {#each [...events.values()] as event}
        <FilterPlate gameInfo={event} {allowMouseOver} on:delete/>
    {:else}
        <div class="not-found">
            <h4>You have no scheduled games.</h4>
        </div>
    {/each}
</div>

<style>
    .container {
        display: grid;
        grid-template-columns: auto;
        justify-content: center;
    }

    .container button{
        float: right;
    }

    .not-found {
        background-color: rgb(86, 86, 251);
        padding-left: 10px;
        padding-right: 10px;
    }

    .not-found h4 {
        color: white;
    }
</style>