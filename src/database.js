import pg from 'pg';

const { Pool } = pg;

const connection = new Pool({
    user: 'postgres',
    password: '212103',
    host: 'localhost',
    port: 5432,
    database: 'gamestore-db'
});

export default connection;