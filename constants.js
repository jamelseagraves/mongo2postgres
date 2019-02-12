function define(name, value) {
    Object.defineProperty(exports, name, {
        value: value,
        enumerable: true
    });
}

define('MONGO_DB_NAME', process.env.MONGODB || 'local');
define('MONGO_COLLECTION_NAME', process.env.MONGOCOLLECTION || 'me');
define('PG_DB_NAME', process.env.PGDATABASE || 'postgres');
define('USERNAME', process.env.PGUSER || 'postgres');
define('PASSWORD', process.env.PGPASSWORD || null);
define('HOST', process.env.PGHOST || 'localhost');
define('PORT', process.env.PGPORT || 5432);