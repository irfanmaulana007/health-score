/* eslint-disable eqeqeq */
import React, { Component } from 'react';
import _ from 'lodash';
import { NotificationContainer } from 'react-notifications';

import Navigation from './../components/Navigation';
import SideNavigation from './../components/SideNavigation';
import Footer from './../components/Footer';

import General from './components/illness input/General';
import Critical from './components/illness input/Critical';
import Mental from './components/illness input/Mental';
import { createNotification } from '../components/Notifications';

import { DSService, HealthScoreService } from './../commons/api.service';

import store from './../store';
import { startLoading, stopLoading, setPageHeader } from './../actions';

export default class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            critical: {
                illnessSelected: [],
                illnessWeight: 0
            },
            general: {
                illnessSelected: [],
                illnessWeight: 0
            },
            mental: {
                illnessSelected: [],
                illnessWeight: 0
            },
            score: null
        }
    }

    componentDidMount () {
        store.dispatch(setPageHeader('Dashboard'));
    }

    refreshGeneral = () => { this.setState({ general: { illnessSelected: [], illnessWeight: 0 } }) }
    handleSelectGeneralIllness = (illness) => { this.setState({ general: { ...this.state.general, illnessSelected: illness } }) }
    handleChangeGeneralWeight = (illness, e) => {
        const weight = e.target.value;

        let selectedIllness = _.find(this.state.general.illnessSelected, ['value', illness])
        selectedIllness.weight = weight;
    }
    handleChangeCustomerGeneralWeight = (e) => {
        this.setState({ general: { ...this.state.general, illnessWeight: e.target.value } })
    }

    refreshCritical = () => { this.setState({ critical: { illnessSelected: [], illnessWeight: 0 } }) }
    handleSelectCriticalIllness = (illness) => { this.setState({ critical: { ...this.state.critical, illnessSelected: illness } }) }
    handleChangeCriticalWeight = (illness, e) => {
        const weight = e.target.value;

        let selectedIllness = _.find(this.state.critical.illnessSelected, ['value', illness])
        selectedIllness.weight = weight;
    }
    handleChangeCustomerCriticalWeight = (e) => {
        this.setState({ critical: { ...this.state.critical, illnessWeight: e.target.value } })
    }

    refreshMental = () => { this.setState({ mental: { illnessSelected: [], illnessWeight: 0 } }) }
    handleSelectMentalIllness = (illness) => { this.setState({ mental: { ...this.state.mental, illnessSelected: illness } }) }
    handleChangeMentalWeight = (illness, e) => {
        const weight = e.target.value;

        let selectedIllness = _.find(this.state.mental.illnessSelected, ['value', illness])
        selectedIllness.weight = weight;
    }
    handleChangeCustomerMentalWeight = (e) => {
        this.setState({ mental: { ...this.state.mental, illnessWeight: e.target.value } })
    }

    calculateHealthScore = () => {
        const criticalWeight = parseFloat(this.state.critical.illnessWeight);
        const generalWeight = parseFloat(this.state.general.illnessWeight);
        const mentalWeight = parseFloat(this.state.mental.illnessWeight);
        const sumIllnessWeight = _.sum([criticalWeight, generalWeight, mentalWeight]);

        if (sumIllnessWeight != 1) {
            createNotification('error', 'Please adjust the illness weights, sum of it must be 1', 'Submit Failed');
            
            return false;
        }
        
        store.dispatch(startLoading('Submit Illness List . . .'));

        HealthScoreService.addIllnessList(this.state)
        .then((res) => {
            createNotification('success', res.data, 'Submit Success')
            this.refreshCritical();
            this.refreshGeneral();
            this.refreshMental();
        })
        .finally(() => {
            store.dispatch(stopLoading())
        });
    }

    render () {
        return (
            <div>
                <Navigation />
                <SideNavigation />
                <NotificationContainer />

                <div className="content">
                    <div className="row">
                        <div className="p-3 font-italic small">
                            <p className="m-0">List provided is mostly based on <b>ICD – 10</b>. For each illness type: <b>critical</b>, <b>general</b> and <b>mental</b>, there are two options: </p>
                            <ul className="pl-3">
                                <li><b>General</b> - List given is based on <b>ICD – 10</b> blocks for each ICD-10 chapter and adjusted 36 common critical illness in insurance (for critical illness)</li>
                                <li><b>Detail</b> - List given is based on <b>ICD - 10</b> category</li>
                            </ul>
                        </div>

                        <Critical refresh={this.refreshCritical} handleSelect={this.handleSelectCriticalIllness} handleChangeWeight={this.handleChangeCriticalWeight} state={this.state.critical} handleChangeCustomerWeight={this.handleChangeCustomerCriticalWeight} />
                        <General refresh={this.refreshGeneral} handleSelect={this.handleSelectGeneralIllness} handleChangeWeight={this.handleChangeGeneralWeight} state={this.state.general} handleChangeCustomerWeight={this.handleChangeCustomerGeneralWeight} />
                        <Mental refresh={this.refreshMental} handleSelect={this.handleSelectMentalIllness} handleChangeWeight={this.handleChangeMentalWeight} state={this.state.mental} handleChangeCustomerWeight={this.handleChangeCustomerMentalWeight} />
                
                        <br/>
                        <div className="col">
                            <button onClick={this.calculateHealthScore} className="btn btn-block btn-theme">Submit</button>
                        </div>
                    </div>
                    <br/>
                </div>

                <Footer />

            </div>
        )
    }
}