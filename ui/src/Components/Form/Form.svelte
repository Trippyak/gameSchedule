<script>
    import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher();

    // mode = Create | Login
	let mode = "Login";

    let name;
    let password

    const submit = () => {
        dispatch("submit", {name, password, mode});
        mode = "Login";
    }

    const setModeToCreate = () => {
        mode = "Create";
    }
</script>

<input type="text" placeholder="Username" bind:value={name}>
<input type="password" placeholder="Password" bind:value={password}>
<button on:click={submit}>{mode}</button>
{#if mode === "Login"}
    <button on:click={setModeToCreate}>Create Account</button>
{/if}

<style>
    @media (max-width: 640px) {
        input {
            width: 90%;
        }

        button {
            width: 90%
        }
	}

    @media (max-width: 250px) {
        input {
            min-width: 150px;
        }

        button {
            min-width: 150px;
        }
	}
</style>