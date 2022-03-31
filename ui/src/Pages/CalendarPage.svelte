<script>
	import { onMount } from "svelte";
	import NarBar from "../Components/NavBar/NarBar.svelte";
	import Calendar from "../Components/Calendar/Calendar.svelte";
	import Creator from "../Components/Creator/Creator.svelte";
	import FilterView from "../Components/FilterView/FilterView.svelte";
	import Popup from "../Components/Popup/Popup.svelte";
	import ExpireInput from "../Components/Popup/ExpireInput.svelte";
	import Api, { createScheduledGame, createShare, filterScheduledGames, deleteSchedule } from "../API/API.svelte";
	
	// states = view | create | filter
	let state = "view";
	let sharing = undefined;
	let width;
	let token;
	let calendar;
	let mobileView;

	export let authorization;

	let errorResponse;
	let searchResults = [];

	let day, month, year, currentDate;

	onMount(() => {
		const date = new Date();
		year = date.getFullYear();
		month = date.getMonth() + 1;
		day = date.getDate();
		currentDate = date.getDate();
	})

	const onAdd = () => {
		state = "create";
	}

	const onSearch = async (event) => {
		const payload = await filterScheduledGames(event.detail, authorization);
		searchResults = payload;
		state = "filter";
	}

	const onSubmit = async (event) => {
		const { game, date, time, platform } = event.detail;
		const [ year, month, day ] = date.split('-');
		const rippedTime = parseInt(time.split(':')[0]);
	
		const res =	await createScheduledGame({
				game: {
					name: game
					, platform
				}
				, schedule: {
					date
					, year
					, month
					, day
					, time: rippedTime
				}
			}
			, authorization);

		if (res.error)
		{
			errorResponse = res;
		}
		else
			state = "view";
	}

	const onShare = async () => sharing = "share";

	const doShare = async ({detail}) => {
		const {date} = detail;
		sharing = undefined;
		if (!calendar && !mobileView)
		{
			errorResponse = {error: "Please leave filter view"};
			return;
		}
		const payload = await createShare(calendar?.getEvents() ?? mobileView?.getEvents(), date, authorization);
		token = payload.token;
	}

	const onDelete = async ({detail}) => {
		const {scheduleID} = detail;
		const payload = await deleteSchedule(scheduleID, authorization);
		if (payload.error)
		{
			errorResponse = payload;
			return;
		}

		let currentlyVisible = calendar ?? mobileView;
		const events = new Map([...currentlyVisible.getEvents()].filter(([k, v]) => v.id !== scheduleID));
		currentlyVisible.setEvents(events);
	}

	const onClose = () => {
		sharing = undefined;
		state = "view";
	}

	const onErrorDismiss = () => errorResponse = undefined;

	const onSuccessDismiss = () => token = undefined

    const incrementMonth = () => month++;
    const decrementMonth = () => month--;
</script>

<svelte:window bind:innerWidth={width}/>
<main>
	<NarBar on:add={onAdd} on:search={onSearch} on:share={onShare}/>
	{#if errorResponse}
		<Popup type={"error"} message={errorResponse.error} on:close={onErrorDismiss}/>
	{:else if token}
		<Popup type={"success"} message={`https://${location.hostname}/share/#${token}`} on:close={onSuccessDismiss}/>
	{:else if sharing === "share"}
		<ExpireInput on:close={onClose} on:submit={doShare}/>
	{/if}
	{#if state === "view"}
		<button on:click={decrementMonth}>Previous Month</button>
		|
		<button on:click={incrementMonth}>Next Month</button>
	{/if}
	{#if state === "view" && width > 1290}
		{#await filterScheduledGames({date: `${year}-${month}-${day}`}, authorization) then events}
			<Calendar bind:this={calendar} {year} {month} {day} {currentDate} {events} allowMouseOver={true} on:delete={onDelete}/>
		{/await}
	{:else if state === "view" && width <= 1290}
		{#await filterScheduledGames({date: `${year}-${month}-${day}`}, authorization) then events}
			<FilterView bind:this={mobileView} {events} isSearch={false} allowMouseOver={true} on:delete={onDelete}/>
		{/await}
	{:else if state === "create"}
		<Creator on:submit={onSubmit} on:cancel={onClose}/>
	{:else if state === "filter"}
		<FilterView events={searchResults} isSearch={true} on:close={onClose}/>
	{/if}
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>