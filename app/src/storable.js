import { writable } from 'svelte/store';

class Store {
    key
    store

    constructor(id, initialValue) {
        if(typeof id === 'undefined') throw new Error('Storables require a key to interact with local storage')
        this.key = id
        this.store = this._exists() ? writable(this._getData()) : writable(initialValue)

        this.get = this.get.bind(this);
        this.set = this.set.bind(this);
        this.update = this.update.bind(this);
        this.subscribe = this.subscribe.bind(this);
        this.detatch = this.detatch.bind(this);
    }

    _exists () { return !!localStorage.getItem(this.key) }

    _getData() {
        const DATA = localStorage.getItem(this.key)
        return JSON.parse(DATA)
    }

    _setData(data) {
        const DATA = JSON.stringify(data)
        localStorage.setItem(this.key, DATA)
    }

    get() {
        this.store.get()
    }

    set(data) {
        this._setData(data)
        this.store.set(data)
    }

    update(callback) {
        const update = (data) => {
            const newData = callback(data)
            this._setData(newData)
            return newData
        }
        this.store.update(update);
    }

    subscribe(callback) {
        return this.store.subscribe(callback)
    }

    detatch() {
        localStorage.removeItem(this.key)
        return true
    }
}

export const storable = (id, initialValue) => {
    return new Store(id, initialValue);
}