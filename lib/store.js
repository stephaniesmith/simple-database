const shortid = require('shortid');
const fs = require('fs');
const path = require('path');

module.exports = class Store {
    constructor(path) {
        this.path = path;
    }

    save(item, callback) {
        item._id = shortid.generate();

        const filePath = path.join(this.path, `${item._id}.json`);
        const content = JSON.stringify(item);

        fs.writeFile(filePath, content, err => {
            if(err) callback(err);
            this.get(item._id, callback);
        });
    }

    get(id, callback) {
        const filePath = path.join(this.path, `${id}.json`);

        fs.readFile(filePath, (err, content) => {
            if(err) callback(err, null);
            const parsedContent = content ? JSON.parse(content) : null;
            callback(null, parsedContent);
        });
    }

    delete(id, callback) {
        const filePath = path.join(this.path, `${id}.json`);

        fs.unlink(filePath, err => {
            if(err && err.code === 'ENOENT') callback(null, { removed: false });
            else if(err) callback(err);
            else callback(null, { removed: true });
        });

    }
};