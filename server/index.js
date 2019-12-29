const express = require('express')
const path = require('path')
require('dotenv').config({ path: path.join(__dirname, '.env') })

const app = express()

if (!process.env.PRODUCTION != 'true') {
	const cors = require('cors')
	app.use(cors({origin: '*'}))
}

const mongo = require('./mongo-connector')
mongo.connect()
require('./api-connector').connect(app, mongo)

const buildPath = path.join(__dirname, '../client/build')
app.use(express.static(buildPath));
app.get('/*', (req, res) => {
	res.sendFile(path.join(buildPath, 'index.html'));
});
app.listen(process.env.PORT, () => {
	console.log(`App listening to port %s`, process.env.PORT)
})