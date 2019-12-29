import React from 'react';
import RestaurantList from '../RestaurantList/RestaurantList'
import Restaurant from '../Restaurant/Restaurant'
import {Switch, Route, Redirect, BrowserRouter} from 'react-router-dom';

function App() {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={RestaurantList} />
                <Route path="/restaurant/:id" component={Restaurant} />
                <Redirect to="/" />
            </Switch>
        </BrowserRouter>
    );
}

export default App;