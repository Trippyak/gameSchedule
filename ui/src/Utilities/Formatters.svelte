<script context="module">
    export const formateTimeFromMilitary = (time) => {
        if (time === 12)
            return `12 PM`;
        else if (time === 0)
            return `12 AM`;
        return time >= 13 ? `${time - 12} PM` : `${time} AM`
    }
</script>