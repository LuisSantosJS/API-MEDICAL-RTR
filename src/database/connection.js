const knex = require('knex');
const path = require('path');

const connection = knex({
    client: 'mysql2',
    connection: {
      host : 'mysql669.umbler.com',
      user : 'medical',
      password : '1nf0rm4t1c4',
      port: Number(41890),
      database : 'medical'
    },
    useNullAsDefault: true
});

module.exports = connection;