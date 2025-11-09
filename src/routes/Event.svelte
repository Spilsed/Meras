<script lang="ts">
    import { type CalendarEvent } from '$lib/state/calendar-state.svelte';

    import { offset, flip, shift } from 'svelte-floating-ui/dom';
    import { createFloatingActions } from 'svelte-floating-ui';

    let { calendarEvent }: { calendarEvent: CalendarEvent } = $props();

    const [floatingRef, floatingContent] = createFloatingActions({
        strategy: 'absolute',
        placement: 'right',
        middleware: [offset(6), flip(), shift()],
    });

    let showPanel = $state(false);
</script>

<button
    class="text-center bg-zinc-500 w-full rounded-lg text-white hover:cursor-pointer"
    use:floatingRef
    onclick={() => (showPanel = !showPanel)}
>
    <h1 class="font-bold">{calendarEvent.title}</h1>
    <p class="font-normal text-md">{calendarEvent.description}</p>
</button>

{#if showPanel}
    <div
        class="absolute bg-zinc-500 rounded-lg text-white p-2 w-[20vw]"
        use:floatingContent
        role="button"
        tabindex="0"
    >
        <div class="text-left">
            <h1 class="font-bold text-xl">{calendarEvent.title}</h1>
            <p class="text-md">{calendarEvent.description}</p>
            <p class="font-light italic">{calendarEvent.datetime.toLocaleString()}</p>
        </div>
    </div>
{/if}
