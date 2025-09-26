<script lang="ts">
    import { invoke } from '@tauri-apps/api/core';

    import { StepBack, StepForward } from '@lucide/svelte';

    import { month_index_to_name } from '$lib/formatting';

    let month = $state(0);
    let month_name = $derived(month_index_to_name(month));
</script>

<div class="h-[5vh] flex justify-center items-center">
    <div class="flex items-center gap-2">
        <button class="hover:cursor-pointer w-10" onclick={() => {}}>
            <StepBack size="20" />
        </button>
        <h1 class="text-center text-xl w-20">{month_name}</h1>
        <button class="hover:cursor-pointer w-10" onclick={() => {}}>
            <StepForward size="20" />
        </button>
    </div>
</div>
