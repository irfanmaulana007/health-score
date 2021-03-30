/* eslint-disable eqeqeq */
import React, { Component } from 'react';
import _ from 'lodash';

import Navigation from './../components/Navigation';
import SideNavigation from './../components/SideNavigation';
import Footer from './../components/Footer';

import General from './components/illness input/General';
import Critical from './components/illness input/Critical';
import Mental from './components/illness input/Mental';

import { DSService, HealthScoreService } from './../commons/api.service';

import store from './../store';
import { startLoading, stopLoading } from './../actions';

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
        store.dispatch(startLoading('Calculating Health Score . . .'));

        const DSPayload = {
            customer_id: 2,
            critical_illness: this.state.critical.illnessSelected,
            general_illness: this.state.general.illnessSelected,
            mental_illness: this.state.mental.illnessSelected
        }

        HealthScoreService.calculateHealthScore(this.state);
        DSService.calculateHealthScore(DSPayload)
        .then((res) => {
            this.setState({ score: res.data.score })
        })
        .finally(() => {
            window.scrollTo(0,document.body.scrollHeight);
            store.dispatch(stopLoading())
        });
    }

    render () {
        const { score } = this.state;

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
                    <br/>

                    {score &&
                        <div className="row">
                            <div className="col">
                                <div className="card mb-3">
                                    <h4 className="text-dark font-weight-light">Health Score</h4>
                                    <h1>{score}</h1>
                                </div>
                            </div>
                        </div>
                    }
                </div>

                <Footer />

            </div>
        )
    }
}