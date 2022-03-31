<script>
	import { onMount } from "svelte";
    import Calendar from "../Components/Calendar/Calendar.svelte";
	import FilterView from "../Components/FilterView/FilterView.svelte";
    import { loadShared } from "../API/API.svelte";
	import Popup from "../Components/Popup/Popup.svelte";

	let errorResponse;
	let events = new Map([]);
    let authorization = undefined;

    let year, month, day, currentDate = 1;
	let width;

    onMount(async () => {
        // pathname = /shared/#AAADDDDDD
		const date = new Date();
        authorization = location.hash.split('#').pop();
		const payload = await loadShared(authorization);
		
		if (payload.error)
		{
			errorResponse = payload;
			return;	
		}

		events = payload;
		year = events.get("year");
		month = events.get("month");
		day = date.getDate();
		currentDate = date.getDate();
	});

	const dismiss = () => {
		errorResponse = null;
	}

</script>

<svelte:window bind:innerWidth={width}/>
<main>
	{#if errorResponse}
		<Popup type={"error"} message={errorResponse.error} on:close={dismiss}/>
	{/if}
	{#if width > 1290}
		<Calendar {year} {month} {day} {currentDate} {events} allowMouseOver={false}/>
	{:else}
		<FilterView {events} isSearch={false} allowMouseOver={false}/>
	{/if}
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		margin: 0 auto;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>