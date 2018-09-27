module.exports = class Store {
    constructor(path) {
        this.path = path;
    }

    save(item, callback) {
        item._id = 1;
        callback(null, item);
    }
}