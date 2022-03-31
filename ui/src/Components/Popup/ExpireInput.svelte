<script>
    import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher();
    
    let width;
    let date;

    const close = () => {
        dispatch("close");
    }

    const submit = () => {
        dispatch("submit", {date});
    }
</script>

<div bind:clientWidth={width} class="popup">
    <h3>Select valid till date</h3>
    <p>Valid from 24 hours to end of current year</p>
    <input type="date" bind:value={date} placeholder="Valid till">
    <button on:click={submit}>Submit</button>
    <button on:click={close}>Cancel</button>
</div>

<style>
    .popup {
        display: grid;
        grid-template-columns: auto;
        position: absolute;
        width: 80%;
        z-index: 2;
        top: 50%;
        left: 50%;
        margin-left: -40%;
        margin-top: -15%;
        align-items: center;
        justify-content: center;
        padding-left: 10px;
        padding-right: 10px;
        overflow-x: visible;
        background-color: rgb(141, 141, 255);
    }

    h3 {
        color: white;
    }

    p {
        color: white;
    }
</style>