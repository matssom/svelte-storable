# Svelte Storable

Svelte Storable is an extention to the `writable` store that comes with `svelte/store`. The purpose of the package is to preserve the state of the store, even after refresh. 

Svelte Store adds `localStorage` management to the store while, with 1 exception preserves the api.

<br>

## Installation

**Include with npm:**
```
npm install 'svelte-storable';
```

**Include locally:**

Download `storable.js` from this repository and include it in your project.

<br>

## Documentation

**Creating a Store**

'The api for `svelte-storable` matches almost identically to the `writable` from `svelte/store`. The key difference is that you need to provide a key to the `storable`. This key will be used when storing and retrieving the persisted data.

```js
// store.js
import { storable } from 'svelte-storable';

                                ||
                                \/
export const count = storable('count', 0);
```

**Using the Store**

Now you can use the store with all your usual `writable` methods. Additionally, you have the `detatch()` method. This can be used to remove the data from `localStorage` so that the value will be fresh on refresh.

:warning: **NB:** If you update the value after `detatch()` it will be stored again.

```html
<!-- App.svelte -->
<script>
    import { count } from './store';

    const increase  = () => count.update((value) => value + 1);
    const decrease  = () => count.update((value) => value - 1);
    const reset     = () => count.set(0);
    const detatch   = () => count.detatch();

</script>

<h1>{$count}</h1>
<button on:click={count.increase}>Increase Count</button>
<button on:click={count.decrease}>Decrese Count</button>
<button on:click={count.reset}>Reset</button>
<button on:click={count.detatch}>Detatch from Storage</button>

```

**Manual Subscribe**

You can also use the subscribe unsubscribe/subscribe manually in addition to using the `$count` syntax.
```js
const unsubscribe = count.subscribe(() => doSomething());
```

**Custom Stores**

With `writable` you can make custom stores. This functionallity also copies over to `svelte-storable`. Again, the key difference is that you need to provide a key. You can optionally take that key as a parameter to your `createStore()` function with a default value.

```js
// store.js
import { storable } from 'svelte-storable';

const createCountStore = (key = 'count') => {
    const { subscribe, set, update, detatch } = storable(key, 0);

    return {
        subscribe,
        increase:   () => update((value) => value + 1),
	decrease:   () => update((value) => value - 1),
	reset:      () => set(0),
        detatch:    () => detatch()
    }
}

export const count = createCountStore();
```

:warning: **NB:** Remember to provide different keys to all the different instances of your custom store. If two or more stores have the same key, they will update each other.
