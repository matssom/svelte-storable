<script>
	import { count } from './store.js';

	const increase = () => count.update((value) => value + 1);
	const decrease = () => count.update((value) => value - 1);
	const reset    = () => $count = 0;
	const remove   = () => count.remove();

</script>

<main>
	<h1>{$count}</h1>
	<button on:click={increase}>Increase Count</button>
	<button on:click={decrease}>Decrese Count</button>
	<button on:click={reset}>Reset</button>
	<button on:click={remove}>Remove from Storage</button>
</main>

<style>
	
</style>