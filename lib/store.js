const shortid = require('shortid');
const fs = require('fs');
const path = require('path');

module.exports = class Store {
    constructor(path) {
        this.path = path;
    }

    save(item, callback) {
        item._id = shortid.generate();

        const filePath = path.join(this.path, `${item._id}.json`)
        const content = JSON.stringify(item);

        fs.writeFile(filePath, content, err => {
            if(err) callback(err);
            fs.readFile(filePath, (err, contents) => {
                callback(null, JSON.parse(contents));
            })
        })
    }
}