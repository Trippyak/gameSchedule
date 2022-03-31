<script>
    import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher();

    export let message;
    // type = error | success
    export let type;

    let width;

    const close = () => {
        dispatch("close");
    }

    const copy = () => {
        navigator.clipboard.writeText(message)
    }
</script>

<div bind:clientWidth={width} class="popup" style={type === "error" ? `background-color: red;` : `background-color: rgb(86, 86, 251);`}>
    <h3>{message}</h3>
    <button on:click={close}>Dismiss</button>
    {#if type === "success"}
        <button id="copy-button" on:click={copy}>Copy</button>
    {/if}
</div>

<style>
    .popup {
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
    }

    h3 {
        color: white;
    }

    #copy-button:focus {
        background-color: rgb(141, 141, 255);
    }
</style>