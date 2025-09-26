<script lang="ts">
    let days: number[] = [];

    for (let i: number = 0; i < 30 + 5; i++) {
        days.push(i % 31);
    }
</script>

<div class="w-full h-full">
    <div class="grid grid-cols-7 grid-rows-5 h-screen">
        {#each days as day}
            <div class="w-full h-full bg-gray-200 p-2 border-1 border-black">
                <h1 class="w-full text-center">{day + 1}</h1>
            </div>
        {/each}
    </div>
</div>
