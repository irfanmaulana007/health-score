import React, { Component } from 'react';

import Navigation from './../components/Navigation';
import SideNavigation from './../components/SideNavigation';
import Footer from './../components/Footer';
import FormGroup from './../components/FormGroup';

export default class Dashboard extends Component {
    render () {
        return (
            <div>
                <Navigation />
                <SideNavigation />

                <div className="content">
                    <div className="row">
                        <div className="col">
                            <div className="card">
                                <h4 className="text-dark font-weight-light">Form</h4>

                                <div className="mt-2 mb-2">
                                    <FormGroup name="fullname" />
                                    <FormGroup name="deases" />
                                    <FormGroup name="weight" />
                                </div>

                                <button className="btn btn-primary">Submit</button>
                            </div>
                        </div>
                    </div>
                </div>

                <Footer />

            </div>
        )
    }
}