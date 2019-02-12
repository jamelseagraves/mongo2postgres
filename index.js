const constants = require('./constants');
const { MongoClient } = require('mongodb');
const { Pool } = require('pg');
const url = 'mongodb://'+constants.MONGO_HOST+':'+constants.MONGO_PORT;
const pgPool = new Pool({
	user: constants.PG_USERNAME,
	password: constants.PG_PASSWORD,
	host: constants.PG_HOST,
    port: constants.PG_PORT,
    database: constants.PG_DB_NAME,
    connectionTimeoutMillis: 2000
});

MongoClient.connect(url, (err, client) => {
	if (err) throw err;
	const db = client.db(constants.PG_DB_NAME);
	const query = { zoneId: 'kcm' };
	db.collection(constants.MONGO_COLLECTION_NAME).find(query).toArray((err, result) => {
		if (err) throw err;
		console.log(result[0]);
		console.log(result.length);
		client.close();
	});
});