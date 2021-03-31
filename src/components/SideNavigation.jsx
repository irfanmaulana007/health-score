import React, { Component } from 'react';

import { Link } from 'react-router-dom';

import './styles.css';

export default class SideNavigation extends Component {
    render () {
        return (
            <nav id="sidenav" className="bg-theme">
                <h4 className="text-center text-light">Health Score</h4>

                <ul className="list-unstyled text-light-1 mt-4">
                    <Link to="/dashboard"><li>Dashboard</li></Link>
                    <Link to="/calculate-score"><li>Calculate Score</li></Link>
                </ul>
            </nav>
        )
    }
}