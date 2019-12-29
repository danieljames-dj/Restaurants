import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

class NavBar extends React.Component {

	render() {
		return (
			<AppBar position="static">
				<Toolbar>
					<Grid
						justify="space-between"
						container
					>
						<Grid item><Typography variant="h6">Restaurants</Typography></Grid>
					</Grid>
				</Toolbar>
			</AppBar>
		)
	}
}
export default NavBar