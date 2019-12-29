import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import NavBar from '../NavBar/NavBar'
import {Link} from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

class RestaurantList extends React.Component {

	constructor() {
		super()
		this.state = {
			originalList: [],
			restaurants: [],
			filterDict: {},
			filters: [],
			sortTypes: ["Best Rating", "Highest Votes", "Cheapest"],
			activeSort: 0,
			activeFilter: "All",
			fetchDetails: (q) => {
				fetch("/api/getRestaurants?q=" + q)
				.then(res => res.json())
				.then((restaurants) => {
					restaurants = this.state.sort(restaurants, this.state.activeSort)
					this.setState({
						activeFilter: "All",
						originalList: restaurants,
						restaurants: restaurants
					})
					this.state.getFilters()
				})
			},
			getFilters: () => {
				var filterDict = {}
				this.state.originalList.map(function(object) {
					var filters = object["Cuisines"].split(',')
					filters.map(function(str) {
						const cuisine = str.trim()
						if (filterDict[cuisine] === undefined) {
							filterDict[cuisine] = [object]
						} else {
							filterDict[cuisine].push(object)
						}
						return str
					})
					return object
				})
				this.setState({
					filterDict: filterDict,
					filters: Object.keys(filterDict)
				})
			},
			sort: function(restaurants, index) {
				var getNormalizedCurrency = function(cur) {
					if (cur === "Botswana Pula(P)")
						return 0.094
					else if (cur === "Brazilian Real(R$)") {
						return 0.25
					} else {
						return 1
					}
				}
				restaurants.sort(function(a, b) {
					switch(index) {
						case 0:
							if (a["Aggregate rating"] > b["Aggregate rating"]) {
								return -1
							} else {
								return 1
							}
						case 1:
							if (a["Votes"] > b["Votes"]) {
								return -1
							} else {
								return 1
							}
						default:
							if (a["Average Cost for two"] * getNormalizedCurrency(a["Currency"]) > b["Average Cost for two"] * getNormalizedCurrency(b["Currency"])) {
								return 1
							} else {
								return -1
							}
					}
				})
				return restaurants
			}
		}
		this.keyPress = this.keyPress.bind(this)
		this.handleClick = this.handleClick.bind(this)
		this.sortAction = this.sortAction.bind(this)
	}

	componentDidMount() {
		this.state.fetchDetails('')
	}

	keyPress(e){
		if (e.keyCode === 13) {
			this.state.fetchDetails(e.target.value)
		}
   }

	handleClick(event, key) {
		if (key === -1) {
			this.setState({
				activeFilter: "All",
				restaurants: this.state.originalList
			})
		} else {
			var newList = this.state.filterDict[this.state.filters[key]]
			this.setState({
				activeFilter: this.state.filters[key],
				restaurants: newList
			})
		}
	}

	sortAction(index) {
		var restaurants = this.state.sort(this.state.restaurants, index)
		this.setState({
			restaurants: restaurants,
			sortAction: index
		})
	}

	render() {
		return (
			<div>
				<NavBar/>
				<br/>
				<TextField id="outlined-basic" label="Search" variant="outlined" onKeyDown={this.keyPress}/>
				<br/><br/>
				<Typography style={{fontSize: 12}} variant="h6">Cuisines: {this.state.activeFilter}</Typography>
				<Button onClick={(event) => this.handleClick(event, -1)}>All</Button>
				{
					this.state.filters.map(function(filter, key) {
						return (<Button key={key} onClick={(event) => this.handleClick(event, key)}>{filter}</Button>)
					}, this)
				}
				<br/><br/>
				<Typography style={{fontSize: 12}} variant="h6">Sort: {this.state.sortTypes[0]}</Typography>
				{
					this.state.sortTypes.map(function(sort, key) {
						return (
							<Button key={key} onClick={(event) => this.sortAction(key)}>{sort}</Button>
						)
					}, this)
				}
				<List component="nav">
					{
						this.state.restaurants.map(function(object) {
							return (
								<div key={object["Restaurant ID"]}>
									<ListItem button component={Link} to={`/restaurant/${object["Restaurant ID"]}`}>
										<List>
											<Typography style={{fontSize: 24}} variant="h6">{object["Restaurant Name"]}</Typography>
											<Typography style={{fontSize: 16}}>Cuisines: {object["Cuisines"]}</Typography>
											<Typography style={{fontSize: 12}}>Rating: {object["Aggregate rating"]} ･ {object["Votes"]} votes</Typography>
											<Typography style={{fontSize: 12}}>Average Cost for two: {object["Average Cost for two"]} {object["Currency"]}</Typography>
										</List>
									</ListItem>
									<Divider component="li" />
								</div>
							)
						}, this)
					}
				</List>
			</div>
		)
	}
}
export default RestaurantList