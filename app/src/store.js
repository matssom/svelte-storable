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