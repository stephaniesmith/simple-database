const assert = require('assert');
//const fs = require('fs');
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

    it('saves and gets a cat', done => {
        const store = new Store(rootDirectory);
        const TC = {
            name: 'TC'
        };

        store.save(TC, (err, cat) => {
            if(err) return done(err);

            TC._id = cat._id;

            assert.ok(cat._id);
            assert.deepEqual(cat, TC);
            store.get(cat._id, (err, tinyCat) => {
                if(err) return done(err);
                assert.deepEqual(tinyCat, TC);
            });
            done();
        });
    });

    it('bad id', done => {
        const store = new Store(rootDirectory);
        const badId = 'badId';

        store.get(badId, (err, tinyCat) => {
            if(err && err.code !== 'ENOENT') return done(err);
            assert.equal(tinyCat, null);
            done();
        });
    });

    it('saves and removes a cat', done => {
        const store = new Store(rootDirectory);
        const TC = {
            name: 'TC'
        };

        store.save(TC, (err, cat) => {
            if(err) return done(err);

            TC._id = cat._id;

            store.delete(cat._id, (err, removed) => {
                if(err) return done(err);
                assert.deepEqual(removed, { removed: true });
                
            });
            done();
        });
    });

    it('cannot remove a cat that does not exist', done => {
        const store = new Store(rootDirectory);
        const badId = 'badId';

        store.delete(badId, (err, removed) => {
            if(err && err.code !== 'ENOENT') return done(err);
            assert.deepEqual(removed, { removed: false });   
        });
        done();
    });

});
