<script>
	import { count } from './store.js';
</script>

<main>
	<div>
		<h1>{$count}</h1>
		<button on:click={count.increase}>Increase Count</button>
		<button on:click={count.decrease}>Decrese Count</button>
		<button on:click={count.reset}>Reset</button>
		<button on:click={count.remove}>Detatch from Storage</button>
	</div>
</main>

<style>
	
</style>