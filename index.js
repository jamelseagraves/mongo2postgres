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

function migrateMetadata(client, users, index) {
	client.query('UPDATE users SET metadata = $1 WHERE id = $2', [JSON.stringify(users[index].metadata), users[index]._id], (err, result) => {
		if (err) throw err;
		if (index >= users.length - 1) {
			client.end();
			return console.log('Done!');
		}
		migrateMetadata(client, users, index+1);
	});
}

MongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
	if (err) throw err;
	console.log('Connected to mongo database');
	const db = client.db(constants.MONGO_DB_NAME);
	const query = { zoneId: 'kcm' };
	db.collection(constants.MONGO_COLLECTION_NAME).find(query).toArray((err, result) => {
		if (err) throw err;
		console.log('Number of users: ' + result.length);
		pgClient.connect()
			.then(() => {
				console.log('Connected to postgres database');
				migrateMetadata(pgClient, result, 0);
			})
			.catch(e => {
				console.error(e);
			});
		client.close();
		console.log('Closed mongo client');
	});
});