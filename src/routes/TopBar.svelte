<script lang="ts">
    import { invoke } from '@tauri-apps/api/core';

    import { StepBack, StepForward } from '@lucide/svelte';

    import { calendarState } from '$lib/state/calendar-state.svelte';
    import { month_index_to_name } from '$lib/formatting';

    let month_name = $derived(month_index_to_name(calendarState.currentDate.getMonth()));

    invoke('create_database');

    $effect(() => {
        invoke('get_events_for_month', {
            monthIndex: calendarState.currentDate.getMonth(),
            year: calendarState.currentDate.getFullYear(),
        }).then((events) => console.log(events));
    });
</script>

<div class="h-[5vh] flex justify-center items-center gap-2">
    <div class="flex items-center gap-2">
        <button
            class="hover:cursor-pointer w-5"
            onclick={() => {
                calendarState.decrementYear();
            }}
        >
            <StepBack size="20" />
        </button>
        <button
            class="hover:cursor-pointer w-5"
            onclick={() => {
                calendarState.incrementYear();
            }}
        >
            <StepForward size="20" />
        </button>
        <h1 class="text-xl w-15 text-right">{calendarState.currentDate.getFullYear()}</h1>
    </div>
    <div class="flex items-center gap-2">
        <h1 class="text-center text-xl w-30">
            {month_name}
        </h1>
        <button
            class="hover:cursor-pointer w-5"
            onclick={() => {
                calendarState.decrementMonth();
            }}
        >
            <StepBack size="20" />
        </button>
        <button
            class="hover:cursor-pointer w-5"
            onclick={() => {
                calendarState.incrementMonth();
            }}
        >
            <StepForward size="20" />
        </button>
    </div>
</div>
