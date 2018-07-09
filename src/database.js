const MongoClient = require('mongodb').MongoClient;
const MongoDBProvider = require('commando-provider-mongo');

client.setProvider(
    MongoClient.connect('mongodb://localhost:27017').then(client => new MongoDBProvider(client, 'abot'))
).catch(console.error);

module.exports = client;