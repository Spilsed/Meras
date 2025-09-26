<script>
    let { children } = $props();
    import '../app.css';
    import TopBar from './TopBar.svelte';
</script>

<TopBar />
{@render children()}
