/* eslint-disable eqeqeq */
import React, { Component } from 'react';
import _ from 'lodash';

import Navigation from './../components/Navigation';
import SideNavigation from './../components/SideNavigation';
import Footer from './../components/Footer';

import General from './components/illness input/General';
import Critical from './components/illness input/Critical';
import Mental from './components/illness input/Mental';

import { HealthScoreService } from './../commons/api.service';

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
            }
        }
    }

    refreshGeneral = () => { this.setState({ general: { ...this.state.general, illnessSelected: [] } }) }
    handleSelectGeneralIllness = (illness) => { this.setState({ general: { ...this.state.general, illnessSelected: illness } }) }
    handleChangeGeneralWeight = (illness, e) => {
        const weight = e.target.value;

        let selectedIllness = _.find(this.state.general.illnessSelected, ['value', illness])
        selectedIllness.weight = weight;
    }
    handleChangeCustomerGeneralWeight = (e) => {
        this.setState({ general: { ...this.state.general, illnessWeight: e.target.value } })
    }

    refreshCritical = () => { this.setState({ critical: { ...this.state.critical, illnessSelected: [] } }) }
    handleSelectCriticalIllness = (illness) => { this.setState({ critical: { ...this.state.critical, illnessSelected: illness } }) }
    handleChangeCriticalWeight = (illness, e) => {
        const weight = e.target.value;

        let selectedIllness = _.find(this.state.critical.illnessSelected, ['value', illness])
        selectedIllness.weight = weight;
    }
    handleChangeCustomerCriticalWeight = (e) => {
        this.setState({ critical: { ...this.state.critical, illnessWeight: e.target.value } })
    }

    refreshMental = () => { this.setState({ mental: { ...this.state.mental, illnessSelected: [] } }) }
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
        console.log(this.state);
        HealthScoreService.calculateHealthScore(this.state);
    }

    render () {
        return (
            <div>
                <Navigation />
                <SideNavigation />

                <div className="content">
                    <div className="row">
                        <General refresh={this.refreshGeneral} handleSelect={this.handleSelectGeneralIllness} handleChangeWeight={this.handleChangeGeneralWeight} state={this.state.general} handleChangeCustomerWeight={this.handleChangeCustomerGeneralWeight} />
                        <Critical refresh={this.refreshCritical} handleSelect={this.handleSelectCriticalIllness} handleChangeWeight={this.handleChangeCriticalWeight} state={this.state.critical} handleChangeCustomerWeight={this.handleChangeCustomerCriticalWeight} />
                        <Mental refresh={this.refreshMental} handleSelect={this.handleSelectMentalIllness} handleChangeWeight={this.handleChangeMentalWeight} state={this.state.mental} handleChangeCustomerWeight={this.handleChangeCustomerMentalWeight} />
                
                        <br/>
                        <div className="col">
                            <button onClick={this.calculateHealthScore} className="btn btn-block btn-theme">Submit</button>
                        </div>
                    </div>
                </div>

                <Footer />

            </div>
        )
    }
}