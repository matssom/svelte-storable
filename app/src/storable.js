import { writable } from 'svelte/store';

export class storable {
    id
    store
  
    constructor(id, data) {
        if(typeof id === 'undefined') throw new Error('Storables require a key to interact')
        this.id = id;
        this.store = this.exists() ? writable(this.getData()) : writable(data);
    }
  
    exists() {
        return !!localStorage.getItem(this.id)
    }
  
    getData() {
        const DATA = localStorage.getItem(this.id)
        return JSON.parse(DATA)
    }
  
    setData(data) {
        const DATA = JSON.stringify(data)
        localStorage.setItem(this.id, DATA)
    }

    get() {
        return this.store.get();
    }

    set(data) {
        this.setData(data);
        this.store.set(data);
    }

    update(callback) {
        const update = (data) => {
            const newData = callback(data);
            this.setData(newData);
            return newData;
        }
        this.store.update(update);
    }

    subscribe (callback) {
        return this.store.subscribe(callback);
    }
  
    remove() {
        localStorage.removeItem(this.id)
        return true
    }  
}