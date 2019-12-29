const {MongoClient} = require('mongodb');

module.exports.db = {}

module.exports.connect = async() => {
	const client = await MongoClient.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/restaurants', {
		useUnifiedTopology: true
	});
	const db = client.db();
	Object.assign(module.exports.db, {
		restaurantDetails: db.collection('restaurantDetails'),
		restaurantAddresses: db.collection('restaurantAddresses')
	})
}