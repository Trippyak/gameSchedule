<script>
    import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher();

    export let scheduleID;
    export let topRight = false;

    const deleteEvent = () => {
        dispatch("delete", {
            scheduleID
        });
    }
</script>

<button class="delete-event" style={topRight ? "top: 0; right: 0;" : "right: inherit"} on:click={deleteEvent}>&times;</button>

<style>
    .delete-event {
        position: absolute;
        z-index: 2;
        padding-left: 5px;
        padding-right: 5px;
        color: white;
        background-color: rgb(50, 50, 189);
        font-size: 16px;
        border: 1px solid black;
    }
</style>