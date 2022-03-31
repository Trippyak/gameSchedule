<script>
    import { createEventDispatcher } from "svelte";
    import { PLATFORMS } from "../../Constants/Constansts.svelte";

    const dispatch = createEventDispatcher();

    let game;
    let platform;
    let date;
    
    const add = () => dispatch("add");

    const search = () => {
        dispatch("search", {
            game
            , platform
            , date
        });
    }

    const share = () => {
        dispatch("share");
    }
</script>

<nav>
    <button class="left" on:click={add}>Create Schedule</button>
    <input type="text" bind:value={game} placeholder="Search Game Title">
    <select bind:value={platform}>
        <option value="">Platform</option>
        {#each PLATFORMS as platformItem}
            <option value={platformItem}>{platformItem}</option>
        {/each}
    </select>
    <input type="date" bind:value={date}>
    <button on:click={search}>Search</button>
    <button class="right" on:click={share}>Share Schedule</button>
</nav>

<style>
    .left {
        float: left;
    }

    .right {
        float: right;
    }

    @media (max-width: 800px) {
        .left {
            float: none;
        }
        
        .right {
            float: none;
        }

        nav {
            display: grid;
            grid-template-rows: auto auto auto auto auto;
        }
    }
</style>