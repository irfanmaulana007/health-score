/* eslint-disable eqeqeq */
import React, { Component } from 'react';
import Select from 'react-select';
import _ from 'lodash';

import FormGroup from './../../../components/FormGroup';

import { IllnessService } from './../../../commons/api.service';

export default class Critical extends Component {
    constructor(props) {
        super(props);
        this.state = {
            criticalIllnessICDCritical: [],
            criticalIllnessICDDetail: [],
            illnessType: 0,
        }
    }

    fetchCriticalICD = () => {
        IllnessService.getCriticalICD()
        .then((res) => {
            this.setState({
                criticalIllnessICDCritical: _.map(_.groupBy(_.sortBy(res.data, 'illness'), 'illness'), (o) =>{
                    return { value: o[0].illness, label: o[0].illness, weight: 0 }
                }),
                criticalIllnessICDDetail: _.map(_.sortBy(res.data, 'icd10Title'), (o) =>{
                    return { value: o.icd10Code, label: o.icd10Title, weight: 0 }
                })
            })
        })
    }

    componentDidMount () {
        this.fetchCriticalICD();
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    handleTypeChange = (e) => {
        this.props.refresh();
        this.setState({ illnessType: e.target.value })
    }

    handleCriticalIllnessCriticalChange = (e) => {
        this.setState({ criticalIllnessICDCriticalSelected: e })
    }

    handleCriticalIllnessDetailChange = (e) => {
        this.setState({ criticalIllnessICDDetailSelected: e })
    }
    

    render () {
        const criticalIllnessSelected = this.props.state.illnessSelected;
        const { criticalIllnessICDCritical, criticalIllnessICDDetail, illnessType } = this.state;

        return (
            <div className="col-12">
                <div className="card mb-3">
                    <h4 className="text-dark font-weight-light">Critical Illness</h4>

                    <div className="mt-2 mb-2">
                        <label className="text-uppercase text-muted small"><b>Illness Type <span className="text-danger">*</span> </b></label>
                        <select name="illnessType" value={illnessType} className="form-control mb-3" onChange={this.handleTypeChange}>
                            <option value="0" disabled>Select Type</option>
                            <option value="1">General</option>
                            <option value="2">Detail</option>
                        </select>

                        {illnessType == 1 && 
                            <div>
                                <label className="text-uppercase text-muted small"><b>Illness <span className="text-danger">*</span> </b></label>
                                <Select className="mb-3" isMulti options={criticalIllnessICDCritical} onChange={this.props.handleSelect}/>

                                {criticalIllnessSelected.length > 0 &&
                                    <div className="row mb-2">
                                        <div className="col-6">Illness Selected</div>
                                        <div className="col-6">Weight (1-5)</div>
                                    </div>
                                }

                                {criticalIllnessSelected.map((values, key) => 
                                    <div key={key} className="row mb-3">
                                        <div className="col-6">
                                            <input type="text" defaultValue={values.label} className="form-control" disabled />
                                        </div>
                                        <div className="col-6">
                                            <input type="number" min="1" max="5" className="form-control" onChange={(e) => this.props.handleChangeWeight(values.value, e)} />
                                        </div>
                                    </div>
                                )}
                            </div>
                        }

                        {illnessType == 2 &&
                            <div>
                                <label className="text-uppercase text-muted small"><b>Illness <span className="text-danger">*</span> </b></label>
                                <Select className="mb-3" isMulti options={criticalIllnessICDDetail} onChange={this.props.handleSelect}/>
                                
                                {criticalIllnessSelected.length > 0 &&
                                    <div className="row mb-2">
                                        <div className="col-6">Illness Selected</div>
                                        <div className="col-6">Weight (1-5)</div>
                                    </div>
                                }

                                {criticalIllnessSelected.map((values, key) => 
                                    <div key={key} className="row mb-3">
                                        <div className="col-6">
                                            <input type="text" defaultValue={values.label} className="form-control" disabled />
                                        </div>
                                        <div className="col-6">
                                            <input type="number" min="1" max="5" className="form-control" onChange={(e) => this.props.handleChangeWeight(values.value, e)} />
                                        </div>
                                    </div>
                                )}
                            </div>
                        }

                        <FormGroup label="illness weight (0-1)" type="number" min="0" max="1" step="0.1" name="critical_weight" onChange={this.props.handleChangeCustomerWeight} required />
                    </div>
                </div>
            </div>
        )
    }
}