import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

class Restaurant extends React.Component {

	constructor() {
		super()
		this.state = {
			restaurant: {
				restaurantDetail: {
					"Restaurant Name": "",
					"Cuisines": "",
					"Average Cost for two": "",
					"Currency": "",
					"Has Table booking": "",
					"Has Online delivery": "",
					"Aggregate rating": "",
					"Rating color": "",
					"Rating text": "",
					"Votes": ""
				},
				restaurantAddress: {
					"Address": ""
				}
			},
			getColor: (color) => {
				switch(color) {
					case 'Dark Green': return '#026440'
					case 'Green': return '#00ff00'
					case 'Orange': return '#ffa500'
					case 'White': return '#808080'
					case 'Yellow': return 'ffff00'
					default: return 'black'
				}
			}
		}
	}

	componentDidMount() {
		fetch(`/api/getRestaurantDetails?id=${this.props.match.params.id}`)
		.then(res => res.json())
		.then((restaurant) => {
			this.setState({
				restaurant: restaurant
			})
		})
	}

	render() {
		return (
			<div>
				<AppBar position="static">
					<Toolbar>
						<Grid
							justify="space-between"
							container
						>
							<Grid item><Typography variant="h6">{this.state.restaurant.restaurantDetail["Restaurant Name"]}</Typography></Grid>
						</Grid>
					</Toolbar>
				</AppBar>
				<ListItem>
					<List>
						<Typography style={{fontSize: 20}} variant="h6">Cuisines: {this.state.restaurant.restaurantDetail["Cuisines"]}</Typography>
						<Typography style={{fontSize: 20}} variant="h6">Average Cost for two: {this.state.restaurant.restaurantDetail["Average Cost for two"]} {this.state.restaurant.restaurantDetail["Currency"]}</Typography>
						<Typography style={{fontSize: 20}} variant="h6">Has Table booking: {this.state.restaurant.restaurantDetail["Has Table booking"]}</Typography>
						<Typography style={{fontSize: 20}} variant="h6">Has Online delivery: {this.state.restaurant.restaurantDetail["Has Online delivery"]}</Typography>
						<Typography style={{fontSize: 20, color: this.state.getColor(this.state.restaurant.restaurantDetail["Rating color"])}} variant="h6">Aggregate rating: {this.state.restaurant.restaurantDetail["Aggregate rating"]} ({this.state.restaurant.restaurantDetail["Rating text"]})</Typography>
						<Typography style={{fontSize: 20}} variant="h6">Votes: {this.state.restaurant.restaurantDetail["Votes"]}</Typography>
						<Typography style={{fontSize: 20}} variant="h6">City: {this.state.restaurant.restaurantAddress["City"]}</Typography>
						<Typography style={{fontSize: 20}} variant="h6">Address: {this.state.restaurant.restaurantAddress["Address"]}</Typography>
						<Typography style={{fontSize: 20}} variant="h6">Locality: {this.state.restaurant.restaurantAddress["Locality"]}</Typography>
						<Typography style={{fontSize: 20}} variant="h6">Locality Verbose: {this.state.restaurant.restaurantAddress["Locality Verbose"]}</Typography>
						<Button variant="contained" color="primary" href={"https://maps.google.com/?q=" + this.state.restaurant.restaurantAddress["Latitude"] + "," + this.state.restaurant.restaurantAddress["Longitude"]}>Open Location</Button>
					</List>
				</ListItem>
			</div>
		)
	}
}
export default Restaurant