<script lang="ts">
    import { getDaysInMonth, getFirstSundayOfMonth } from '$lib/formatting';
    import { calendarState } from '$lib/state/calendar-state.svelte';
    import Event from './Event.svelte';

    let dayOffset: number = $state(getFirstSundayOfMonth(calendarState.currentDate));
    let daysInMonth: number = $state(
        getDaysInMonth(
            calendarState.currentDate.getMonth(),
            calendarState.currentDate.getFullYear(),
        ),
    );
    let days: number[] = $state([]);

    for (let i: number = dayOffset; i < daysInMonth; i++) {
        days.push(i % daysInMonth);
    }
</script>

<div class="w-full h-full">
    <div class="grid grid-cols-7 text-center">
        {#each ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'] as day}
            <div>
                <h1>{day}</h1>
            </div>
        {/each}
    </div>
    <div class="grid grid-cols-7 grid-rows-5 h-screen">
        {#each days as day}
            <div class="w-full h-full bg-gray-200 p-2 border-1 border-black">
                <h1 class="w-full text-center">{day + 1}</h1>
                {#each calendarState.getEventsOnDay(day) as calendarEvent}
                    <Event {calendarEvent} />
                {/each}
            </div>
        {/each}
    </div>
</div>
