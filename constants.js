function define(name, value) {
    Object.defineProperty(exports, name, {
        value: value,
        enumerable: true
    });
}

define('MONGO_HOST', process.env.MONGOHOST || 'localhost');
define('MONGO_PORT', process.env.MONGOPORT || 27017);
define('MONGO_DB_NAME', process.env.MONGODB || 'local');
define('MONGO_COLLECTION_NAME', process.env.MONGOCOLLECTION || 'me');
define('PG_DB_NAME', process.env.PGDATABASE || 'postgres');
define('PG_USERNAME', process.env.PGUSER || 'postgres');
define('PG_PASSWORD', process.env.PGPASSWORD || null);
define('PG_HOST', process.env.PGHOST || 'localhost');
define('PG_PORT', process.env.PGPORT || 5432);