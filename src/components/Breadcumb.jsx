import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';

export default class Footer extends Component {
    render () {
        return (
            <div className="mb-3 text-capitalize">
                <Link to={this.props.prevNav}><FontAwesomeIcon icon={faChevronLeft} className="mr-2" />{this.props.prevNav}</Link>
            </div>
        )
    }
}