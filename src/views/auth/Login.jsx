/* eslint-disable eqeqeq */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import store from '../../store';

import FormGroup from '../../components/FormGroup';
import { startLoading, stopLoading } from '../../actions';

import { setToken, setID } from '../../commons/jwt.service';
import { authService } from '../../commons/api.service';

const initState = {
    email: 'johndoe@gmail.com',
    password: 'asdf'
}

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = initState
    }
    
    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    login = () => {
        // store.dispatch(startLoading('Logging in . . .'));
        // authService.login(this.state)
        // .then((res) => { 
            // setToken(res.data.token);
            // setID(res.data.user.id);

            this.props.history.push('/dashboard');
        // })
		// .finally(() => { store.dispatch(stopLoading()) })
    }

    render () {
        return (
            <div>
                <div id="login-background"></div>
                <div className="row mt-5">
                    <div className="col-6 offset-3">
                        <div className="card bg-white p-4 mt-5">
                            <h4 className="text-center">Health Score by Semut Merah Analytics</h4>
                            <br />

                            <FormGroup name="email" autoFocus onChange={this.handleChange} value={this.state.email} />
                            <FormGroup name="password" type="password" onChange={this.handleChange}  value={this.state.password}/>
                            <br/>

                            <button onClick={this.login} className="btn btn-primary btn-block">Sign In</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Login;