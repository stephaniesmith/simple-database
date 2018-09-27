const assert = require('assert');
const fs = require('fs');
const path = require('path');
const rimraf = require('rimraf');
const mkdirp = require('mkdirp');
const Store = require('../lib/store');

describe('store', () => {

    const rootDirectory = path.join(__dirname, 'cats');

    beforeEach(done => {
        rimraf(rootDirectory, err => {
            if(err && err.code !== 'ENOENT') done(err);
            else done();
        });
    });

    beforeEach(done => {
        mkdirp(rootDirectory, err => {
            if(err && err.code !== 'ENOENT') done(err);
            else done();
        });
    });

    it('saves a cat', done => {
        const store = new Store(rootDirectory);
        const TC = {
            name: 'TC'
        };

        store.save(TC, (err, cat) => {
            if(err) return don(err);

            assert.ok(cat._id);
            assert.deepEqual(cat, { _id: cat._id, ...TC })
            done();
        })
    })

    
})