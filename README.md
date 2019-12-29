## Database

```
mongoimport -d restaurants -c restaurantDetails --type csv --file csv_exports/restaurantsa9126b3.csv --headerline
mongoimport -d restaurants -c restaurantAddresses --type csv --file csv_exports/restaurant_addc9a1430.csv --headerline
```

## Server

Sample .env file
```
PRODUCTION=false
MONGO_URI=mongodb://localhost:27017/restaurant
PORT=3000
```

Setup
```
cd server
npm install
npm start
```

## Client

Setup
```
cd client
npm install
npm run build
```