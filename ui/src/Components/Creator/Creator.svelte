<script>
    import { createEventDispatcher, onMount } from "svelte";
    import Constansts , { PLATFORMS } from "../../Constants/Constansts.svelte";

    const dispatch = createEventDispatcher();

    let game;
    let date;
    let time;
    let platform;

    const submit = () => {
        dispatch("submit", {
            game
            , date
            , time
            , platform
        });
    }

    const cancel = () => {
        dispatch("cancel");
    }

</script>

<div class="vertical">
    <input type="text" bind:value={game}>
    <input type="date" bind:value={date}>
    <input type="time" bind:value={time}>
    <select bind:value={platform}>
        <option value="">Platform</option>
        {#each PLATFORMS as platformItem}
            <option>{platformItem}</option>
        {/each}
    </select>
    <button on:click={submit}>Submit</button>
    <button on:click={cancel}>Cancel</button>
</div>

<style>
    .vertical {
        display: grid;
        grid-template-columns: auto;
        justify-content: center;
        margin-top: 5%;
    }
</style>