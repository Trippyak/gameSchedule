<script>
	import LandingPage from "./Pages/LandingPage.svelte";
	import CalendarPage from "./Pages/CalendarPage.svelte";
	import { onMount } from "svelte";

	let authorization = undefined;

	onMount(() => {
		location.hash = "#account";
	});

	const onAuthorized = ({detail}) => {
		authorization = detail.authorization;
		location.hash = "#schedule";
	}
</script>

{#if !authorization}
	<LandingPage on:authorized={onAuthorized}/>
{:else}
	<CalendarPage {authorization}/>
{/if}