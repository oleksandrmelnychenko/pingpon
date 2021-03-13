var store = undefined;

export default {
    init(configuredStore) {
        store = configuredStore;
    },
    getStore() {
        return store;
    }
}