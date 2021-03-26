import React, { Component } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';

export default class Navigation extends Component {
    render () {
        return (
            <nav id="nav">
                <ul className="list-unstyled text-right">
                    <li><FontAwesomeIcon icon={faCog} className="mr-2" /></li>
                </ul>
            </nav>
        )
    }
}