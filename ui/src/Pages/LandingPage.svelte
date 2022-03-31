<script>
	import { createEventDispatcher } from "svelte";
	import Form from "../Components/Form/Form.svelte";
	import Popup from "../Components/Popup/Popup.svelte";
	import { login, create } from "../API/API.svelte";	

	let authorization;
	let errorResponse;

	const dispatch = createEventDispatcher();

	const authorized = () => {
		dispatch("authorized", {authorization});
	}

	const onSubmit = async ({detail}) => {
		const {name, password, mode} = detail;

		if (mode === "Login")
		{
			authorization = await login(name, password);
			if (authorization != "")
				authorized();
			else
			{
				errorResponse = {
					error: "Invalid user credentails"
				}
			}
		}
		else if (mode === "Create")
		{
			const payload = await create(name, password);
			if (payload.error)
			{
				errorResponse = payload;
			}
		}
	}

	const dismiss = () => {
		errorResponse = undefined;
	}

</script>

<main>
	{#if errorResponse}
		<Popup type={"error"} message={errorResponse.error} on:close={dismiss}/>
	{/if}
	<Form on:submit={onSubmit}/>
</main>

<style>
	main {
		position: absolute;
		display: grid;
		grid-template-columns: auto;
		text-align: center;
		padding: 1em;
		margin: 0 auto;
		width: 60%;
		height: 20%;
		top: 50%;
		left: 50%;
		margin-top: -10%;
		margin-left: -30%;
	}

	@media (min-width: 650px) {
		main {
			margin-top: -5%;
		}
	}
	@media (max-width: 600px) {
		main {
			margin-top: -15%;
		}
	}

	@media (max-width: 350px) {
		main {
			margin-top: -25%;
		}
	}

	@media (max-width: 250px) {
		main {
			margin-top: -30%;
		}
	}
</style>