const constants = require('./constants');
const { MongoClient } = require('mongodb');
const { Client } = require('pg');
const url = 'mongodb://mongo:27017';
const pgPool = new Pool({
	user: constants.USERNAME,
	password: constants.PASSWORD,
	host: constants.HOST,
    port: constants.PORT,
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
	});
});