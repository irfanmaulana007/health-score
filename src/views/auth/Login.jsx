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
        store.dispatch(startLoading('Logging in . . .'));
        authService.login(this.state)
        .then((res) => { 
            setToken(res.data.token);
            setID(res.data.user.id);

            this.props.history.push('/dashboard');
        })
		.finally(() => { store.dispatch(stopLoading()) })
    }

    handleDocumentClick = (e) => {
        if (e.keyCode === 13) {
            this.login();
        }
    }

    componentWillMount () {
        document.addEventListener("keydown", this.handleDocumentClick, false);
    }
    componentWillUnmount () {
        document.removeEventListener("keydown", this.handleDocumentClick, false);
    }

    render () {
        return (
            <div>
                <div id="login-background"></div>
                <div className="row p-5">
                    <div className="col-6 text-center">
                        <div className="box pt-5 ml-5 text-white">
                            {/* <img src={Logo} alt="" height="120px" /> */}
                            <p>Sign in untuk menggunakan POS</p>
                        </div>
                    </div>
                    <div className="col-5">
                        <div className="box bg-white">
                            <h3>Sign in</h3>
                            <br />

                            <FormGroup name="email" autoFocus onChange={this.handleChange} value={this.state.email} />
                            <FormGroup name="password" type="password" onChange={this.handleChange}  value={this.state.password}/>
                            <h6 className="text-right small"><Link to="/" >Forgot Password</Link></h6>
                            <br/>

                            <button onClick={this.login} className="btn btn-primary btn-block">Login (Enter)</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Login;