const pg = require('pg');

const pool = new pg.Pool({
    database: 'koalla_holla',
    host: 'localhost',
    port: 5432

})

module.exports = pool;