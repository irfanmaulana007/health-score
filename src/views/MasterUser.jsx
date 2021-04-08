import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal';

import Navigation from '../components/Navigation';
import SideNavigation from '../components/SideNavigation';
import Footer from '../components/Footer';

import { UserService } from './../commons/api.service';

import store from '../store';
import { startLoading, stopLoading } from './../actions';
import _ from 'lodash';

const dummyUser = [
    { id: '00081827384', name: 'John Doe', healthScore: 90, address: 'Jalan Menteng Kecil no.13', phone: '08288282134', illness: 'Cancer' },
    { id: '00081827385', name: 'Jane Doe', healthScore: 70, address: 'Jalan Bangka no.21', phone: '08288188123', illness: 'Lupus, Cancer, Stroke' },
    { id: '00081827386', name: 'Agus Septiadi', healthScore: 80, address: 'Jalan Senopati no.28', phone: '081808192873', illness: 'Stroke, Cancer' },
    { id: '00081827387', name: 'Bambang', healthScore: 80, address: 'Jalan Kebon Pala no.16', phone: '08887178234', illness: 'Stroke, Lupus' },
    { id: '00081827388', name: 'Maulana Cakra', healthScore: 90, address: 'Jalan Margonda Raya no.41', phone: '08181938425', illness: 'Heart Disease' },
    { id: '00081827389', name: 'Irfan Maulana', healthScore: 90, address: 'Jalan Dukuh Pinggir no.15', phone: '08189184731', illness: 'Protozoal Disease, Unspecified Mental Disorder' },
    { id: '00081827390', name: 'Khoiry Alfisyahr', healthScore: 90, address: 'Jalan Petojo Enclek no.11', phone: '08191871345', illness: 'Cancer, ' },
    { id: '00081827391', name: 'Ilham Darmawan', healthScore: 96, address: 'Jalan Petamburan 2 no.19', phone: '08888719873', illness: 'Protozoal Disease' },
    { id: '00081827392', name: 'Marpiero Romandung', healthScore: 94, address: 'Jalan Petamburan 3 no.22', phone: '08181891832', illness: 'Mood [affective] Disorders' }
]

export default class MasterUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            isModalShow: false,
            selectedUser: {}
        }
    }

    fetchUserList = () => {
        store.dispatch(startLoading('Fetching User List . . .'))
        UserService.get()
        .then((res) => this.setState({ users: res.data }))
        .finally(() => store.dispatch(stopLoading()))
    }

    componentDidMount() {
        this.fetchUserList();
    }

    handleShowModal = (id) => { this.setState({ isModalShow: true, selectedUser: _.find(dummyUser, ['id', id]) }) }
    handleCloseModal = () => { this.setState({ isModalShow: false, selectedUser: {} }) }

    render () {
        const { selectedUser } = this.state;

        return (
            <div>
                <Navigation />
                <SideNavigation />

                <div className="content">
                    <div className="row">
                        <div className="col-12">
                            <div className="card mb-3">
                                <h4 className="text-dark font-weight-light">Master User</h4>

                                <table className="table table-striped small mt-2 mb-2">
                                    <thead>
                                        <tr>
                                            <th>Nomor Peserta</th>
                                            <th>Nama</th>
                                            <th>Health Score</th>
                                            <th>Alamat</th>
                                            <th>Nomor Telepon</th>
                                            <th>Penyakit</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {dummyUser.map((values, key) => 
                                            <tr key={key}>
                                                <td>{values.id}</td>
                                                <td>{values.name}</td>
                                                <td>{values.healthScore}</td>
                                                <td>{values.address}</td>
                                                <td>{values.phone}</td>
                                                <td>{values.illness}</td>
                                                <td><button className="btn btn-primary btn-sm" onClick={() => this.handleShowModal(values.id)}>Detail</button></td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>

                <Modal show={this.state.isModalShow} onHide={this.handleCloseModal} size="xl" className="mt-5">
                    <Modal.Header closeButton>
                        <Modal.Title>{selectedUser.name}</Modal.Title>
                    </Modal.Header>
                    
                    <Modal.Body>
                        <div className="row">
                            <div className="col pt-4 pb-4">
                                <h1 className="text-center text-success">{selectedUser.healthScore}</h1>
                                <h5 className="text-center font-weight-bold">Kesehatan Anda cukup baik</h5>
                                <h6 className="text-center text-muted">Tingkatkan lagi kesehatan Anda dengan pola hidup yang baik</h6>
                            </div>
                        </div>
                        <br/>
                        <div className="row">
                            <div className="col ml-2">
                                <h4>Riwayat Perawatan</h4>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col p-0">
                                <div className="pt-2 pb-4">
                                    <div className="container">
                                        <table className="table table-striped small w-100">
                                            <thead>
                                                <tr>
                                                    <th>Tanggal</th>
                                                    <th>Aktifitas</th>
                                                    <th>Penyakit</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>15/03/2020</td>
                                                    <td>Rawat Inap</td>
                                                    <td>Stroke, Cancer</td>
                                                </tr>
                                                <tr>
                                                    <td>17/08/2020</td>
                                                    <td>Rawat Inap</td>
                                                    <td>Cancer</td>
                                                </tr>
                                                <tr>
                                                    <td>17/12/2020</td>
                                                    <td>Operasi</td>
                                                    <td>Cancer</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Modal.Body>
                </Modal>

                <Footer />
            </div>
        )
    }
}