const constants = require('./constants');
const { MongoClient } = require('mongodb');
const { Client } = require('pg');
const url = 'mongodb://'+constants.MONGO_HOST+':'+constants.MONGO_PORT;
const pgClient = new Client({
	user: constants.PG_USERNAME,
	password: constants.PG_PASSWORD,
	host: constants.PG_HOST,
    port: constants.PG_PORT,
    database: constants.PG_DB_NAME
});

function migrateMetadata(mongoClient, pgClient, users, index) {
	pgClient.query('UPDATE users SET metadata = '+ users[index].metadata +'WHERE id = ' + users[index]._id, (err, result) => {
		if (err) throw err;
		if (index >= 1) {
			pgClient.end();
			mongoClient.close();
			return console.log('Done!');
		}
		migrateMetadata(pgClient, users, index+1);
	});
}

MongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
	if (err) throw err;
	console.log('Connected to mongo database');
	const db = client.db(constants.MONGO_DB_NAME);
	const query = { zoneId: 'kcm' };
	db.collection(constants.MONGO_COLLECTION_NAME).find(query).toArray((err, result) => {
		if (err) throw err;
		pgClient.connect();
		console.log('Connected to postgres database');
		migrateMetadata(client, pgClient, result, 0);
	});
});