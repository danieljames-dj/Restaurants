module.exports = function(req, res, db) {
	const search = new RegExp(req.query.q || '', 'i')
	console.log("HI")
	db.restaurantDetails.find({
		"Restaurant Name": search
	}).toArray().then(list => {
		console.log(list)
		res.send(list)
	})
}