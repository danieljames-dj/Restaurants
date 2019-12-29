module.exports = function(req, res, db) {
	db.restaurantDetails.findOne({
		"Restaurant ID": parseInt(req.query.id)
	}).then(restaurantDetail => {
		db.restaurantAddresses.findOne({
			"Restaurant ID": parseInt(req.query.id)
		}).then(restaurantAddress => {
			res.send({
				restaurantDetail: restaurantDetail,
				restaurantAddress: restaurantAddress
			})
		})
	})
}