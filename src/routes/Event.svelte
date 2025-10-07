<script lang="ts">
    import { type CalendarEvent } from '$lib/state/calendar-state.svelte';

    let { calendarEvent }: { calendarEvent: CalendarEvent } = $props();
</script>

<div class="text-center bg-zinc-500 rounded-xl text-white">
    <h1 class="font-bold">{calendarEvent.title}</h1>
    <p class="font-normal text-md">{calendarEvent.description}</p>
</div>
