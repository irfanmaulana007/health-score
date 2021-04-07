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
import Dashboard from './views/Dashboard';
import CalculateScore from './views/CalculateScore';
import MasterUser from './views/MasterUser';
import Result from './views/Result';

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

						<Route path="/dashboard" component={Dashboard} />
						<Route path="/calculate-score" component={CalculateScore} />
						<Route path="/master-user" component={MasterUser} />
						<Route path="/result" component={Result} />

						<Route path="*" component={NotFound} />
					</Switch>
			</Router>
		)
	}
}

export default App;
