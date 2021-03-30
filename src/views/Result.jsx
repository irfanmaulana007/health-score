import React, { Component } from 'react';

import Navigation from './../components/Navigation';
import SideNavigation from './../components/SideNavigation';
import Footer from './../components/Footer';
import Breadcumb from './../components/Breadcumb';

export default class Result extends Component {
    render () {
        return (
            <div>
                <Navigation />
                <SideNavigation />

                <div className="content">
                    <Breadcumb prevNav="dashboard" />
                    <div className="row">
                        <div className="col">
                            <div className="card">
                                <h4 className="text-dark font-weight-light">Result</h4>
                            </div>
                        </div>
                    </div>
                </div>

                <Footer />

            </div>
        )
    }
}