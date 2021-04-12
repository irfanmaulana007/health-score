import React, { Component } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';

import store from './../store';

export default class Navigation extends Component {
    render () {
        return (
            <nav id="nav">
                <h4 className="ml-3 float-left">{store.getState().utils.pageHeader}</h4>
                <ul className="list-unstyled text-right">
                    <li><FontAwesomeIcon icon={faCog} className="mr-2" /></li>
                </ul>
            </nav>
        )
    }
}