import { writable } from 'svelte/store';

let key, writableStore;

const exists = () => !!localStorage.getItem(key);

const getData = () => {
    const DATA = localStorage.getItem(key)
    return JSON.parse(DATA)
}

const setData = (data) => {
    const DATA = JSON.stringify(data)
    localStorage.setItem(key, DATA)
}

//store
const store = {};

store.get = () => writableStore.get();

store.set = (data) => {
    setData(data);
    writableStore.set(data);
}

store.update = (callback) => {
    const update = (data) => {
        const newData = callback(data);
        setData(newData);
        return newData;
    }
    writableStore.update(update);
}

store.subscribe = (callback) => writableStore.subscribe(callback);

store.remove = () => {
    localStorage.removeItem(key)
    return true
}

export const storable = (id, initialValue) => {
    if(typeof id === 'undefined') throw new Error('Storables require a key to interact')
    key = id;
    writableStore = exists() ? writable(getData()) : writable(initialValue);
    return store;
}