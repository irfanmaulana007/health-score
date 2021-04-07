/* eslint-disable eqeqeq */
import React, { Component } from 'react';
import Select from 'react-select';
import _ from 'lodash';
import { NotificationContainer } from 'react-notifications';

import Navigation from '../components/Navigation';
import SideNavigation from '../components/SideNavigation';
import Footer from '../components/Footer';
import { createNotification } from '../components/Notifications';

import { DSService, IllnessService } from '../commons/api.service';

import store from '../store';
import { startLoading, stopLoading } from '../actions';

export default class CalculateScore extends Component {
    constructor(props) {
        super(props);
        this.state = {
            critical_illness_list: [],
            critical_illness: [],
            general_illness_list: [],
            general_illness: [],
            mental_illness: [],
            mental_illness_list: [],
            score: null
        }
    }

    fetchCriticalIllnessList = () => {
        store.dispatch(startLoading('Fetching Illness List . . .'));

        IllnessService.getCriticalList()
        .then((res) => this.setState({
            critical_illness_list: _.map(res.data, (o) => {
                return { value: o.IllnessCode, label: o.IllnessCode }
            })
        }))
        .finally(() => store.dispatch(stopLoading()));
    }

    fetchGeneralIllnessList = () => {
        store.dispatch(startLoading('Fetching Illness List . . .'));

        IllnessService.getGeneralList()
        .then((res) => this.setState({
            general_illness_list: _.map(res.data, (o) => {
                return { value: o.IllnessCode, label: o.IllnessCode }
            })
        }))
        .finally(() => store.dispatch(stopLoading()));
    }

    fetchMentalIllnessList = () => {
        store.dispatch(startLoading('Fetching Illness List . . .'));

        IllnessService.getMentalList()
        .then((res) => this.setState({
            mental_illness_list: _.map(res.data, (o) => {
                return { value: o.IllnessCode, label: o.IllnessCode }
            })
        }))
        .finally(() => store.dispatch(stopLoading()));
    }

    componentDidMount () {
        this.fetchCriticalIllnessList();
        this.fetchGeneralIllnessList();
        this.fetchMentalIllnessList();
    }

    handleSelectCriticalIllness = (illness) => { this.setState({ critical_illness: illness })}
    handleSelectGeneralIllness = (illness) => { this.setState({ general_illness: illness }) }
    handleSelectMentalIllness = (illness) => { this.setState({ mental_illness: illness }) }

    calculateHealthScore = () => {
        store.dispatch(startLoading('Calculating Health Score . . .'));

        const payload = {
            customer_id: 2,
            critical_illness: _.map(this.state.critical_illness, ((o) => { return o.value } )),
            general_illness: _.map(this.state.general_illness, ((o) => { return o.value } )),
            mental_illness: _.map(this.state.mental_illness, ((o) => { return o.value } ))
        }

        DSService.calculateHealthScore(payload)
        .then((res) => {
            this.setState({ score: res.data.score })
        })
        .catch((err) => createNotification('error', 'Calculate Health Score Failed', 'Something Wrong'))
        .finally(() => {
            window.scrollTo(0,document.body.scrollHeight);
            store.dispatch(stopLoading())
        });
    }

    render () {
        const { critical_illness_list, general_illness_list, mental_illness_list, score } = this.state;

        return (
            <div>
                <Navigation />
                <SideNavigation />
                <NotificationContainer />

                <div className="content">
                    <div className="row">
                        <div className="col-12">
                            <div className="card mb-3">
                                <h4 className="text-dark font-weight-light">Calculate Health Score</h4>

                                <div className="mt-2 mb-2">
                                    <label className="text-uppercase text-muted small"><b>General Illness</b></label>
                                    <Select className="mb-3" isMulti options={general_illness_list} onChange={this.handleSelectGeneralIllness}/>

                                    <label className="text-uppercase text-muted small"><b>Critical Illness</b></label>
                                    <Select className="mb-3" isMulti options={critical_illness_list} onChange={this.handleSelectCriticalIllness}/>

                                    <label className="text-uppercase text-muted small"><b>Mental Illness</b></label>
                                    <Select className="mb-3" isMulti options={mental_illness_list} onChange={this.handleSelectMentalIllness}/>
                                </div>
                            </div>
                        </div>
                
                        <br/>
                        <div className="col">
                            <button onClick={this.calculateHealthScore} className="btn btn-block btn-theme">Calculate</button>
                        </div>
                    </div>
                    <br/>

                    {score !== null  &&
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