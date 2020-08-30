const knex = require('knex');
const path = require('path');

const connection = knex({
    client: 'sqlite3',
    connection: {
        filename: path.resolve(__dirname, 'db.sqlite'),
    },
    migrations: {
        directory: path.resolve(__dirname, 'database', 'migrations')
    },
    seeds: {
        directory: path.resolve(__dirname, 'database', 'seeds')
    },
    useNullAsDefault: true
});

module.exports = connection;