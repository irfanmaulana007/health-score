import React, { Component } from 'react';
import { createBrowserHistory } from 'history';
import { Router, Route, Switch, Redirect } from "react-router-dom";

import store from './store';

// Styles
import './App.css';

// Components
import Loaders from './components/Loaders'

// Views
import Login from './views/auth/Login';
import NotFound from './views/NotFound';

const history = createBrowserHistory();
class App extends Component {
	constructor(props) {
        super(props);
        this.state = store.getState().utils;
    
        store.subscribe (() => {
            this.setState(store.getState().utils);
        })
    }
    
	render() {
        let { loaders, message } = this.state;
        
		return (
			<Router history={history}>
					<Loaders display={loaders} message={message} />

					<Switch>
						<Route exact path="/login" component={Login} />
						<Route exact path="/" render={ () => {
							return <Redirect to='/login' />
						} } />

						<Route path="*" component={NotFound} />
					</Switch>
			</Router>
		)
	}
}

export default App;
