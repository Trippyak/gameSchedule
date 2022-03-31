<script>
    import MonthView from "./MonthView.svelte";
    
    export let events = new Map([]);
    export let month = 1, day = 1, year = 2000, currentDate = 1;
    export let allowMouseOver;

    let maxDays;
    
    let daysOfWeek = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
    let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    
    let monthString;
    let offsetArray;

    // adjust months and years
    $: {
        if (month > 12)
        {
            incrementYear();
            month = 1;
        }
        else if (month < 1)
        {
            decrementYear();
            month = 12;
        }
        updateMaxValues();
        monthString = months[month - 1];
        offsetArray = [...Array(getFirstDayOfMonth().getDay()).keys()];
    }

    const updateMaxDays = () => maxDays = new Date(year, month, 0).getDate();

    const updateMaxValues = () => {
        updateMaxDays();
    }

    const incrementYear = () => year++;
    const decrementYear = () => year--;

    const getFirstDayOfMonth = () => {
        return new Date(year, month - 1, 1);
    }

    export const getEvents = () => events;
    export const setEvents = (newEvents) => events = newEvents;
</script>

<h1>{month}/{day}/{year}</h1>
<MonthView month={monthString} {daysOfWeek} {maxDays} {currentDate} {offsetArray} {events} {allowMouseOver} on:delete/>
