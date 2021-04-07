import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal';

import Navigation from '../components/Navigation';
import SideNavigation from '../components/SideNavigation';
import Footer from '../components/Footer';

import { UserService } from './../commons/api.service';

import store from '../store';
import { startLoading, stopLoading } from './../actions';

export default class MasterUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            isModalShow: false
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

    handleShowModal = () => { this.setState({ isModalShow: true }) }
    handleCloseModal = () => { this.setState({ isModalShow: false }) }

    render () {
        const { users } = this.state;

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
                                        {users.map((values, key) => 
                                            <tr key={key}>
                                                <td>{values.id}</td>
                                                <td>{values.name}</td>
                                                <td>{values.address}</td>
                                                <td>{values.phone}</td>
                                                <td>{values.illness}</td>
                                                <td><button className="btn btn-primary btn-sm" onClick={this.handleShowModal}>Detail</button></td>
                                            </tr>
                                        )}
                                        <tr>
                                            <td>000817172634</td>
                                            <td>John Doe</td>
                                            <td>83</td>
                                            <td>Jalan Menteng Sukabumi no.13</td>
                                            <td>08181819281</td>
                                            <td>Cancer, Stroke</td>
                                            <td><button className="btn btn-primary btn-sm" onClick={this.handleShowModal}>Detail</button></td>
                                        </tr>
                                        <tr>
                                            <td>000817172634</td>
                                            <td>John Doe</td>
                                            <td>83</td>
                                            <td>Jalan Menteng Sukabumi no.13</td>
                                            <td>08181819281</td>
                                            <td>Cancer, Stroke</td>
                                            <td><button className="btn btn-primary btn-sm" onClick={this.handleShowModal}>Detail</button></td>
                                        </tr>
                                        <tr>
                                            <td>000817172634</td>
                                            <td>John Doe</td>
                                            <td>83</td>
                                            <td>Jalan Menteng Sukabumi no.13</td>
                                            <td>08181819281</td>
                                            <td>Cancer, Stroke</td>
                                            <td><button className="btn btn-primary btn-sm" onClick={this.handleShowModal}>Detail</button></td>
                                        </tr>
                                        <tr>
                                            <td>000817172634</td>
                                            <td>John Doe</td>
                                            <td>83</td>
                                            <td>Jalan Menteng Sukabumi no.13</td>
                                            <td>08181819281</td>
                                            <td>Cancer, Stroke</td>
                                            <td><button className="btn btn-primary btn-sm" onClick={this.handleShowModal}>Detail</button></td>
                                        </tr>
                                        <tr>
                                            <td>000817172634</td>
                                            <td>John Doe</td>
                                            <td>83</td>
                                            <td>Jalan Menteng Sukabumi no.13</td>
                                            <td>08181819281</td>
                                            <td>Cancer, Stroke</td>
                                            <td><button className="btn btn-primary btn-sm" onClick={this.handleShowModal}>Detail</button></td>
                                        </tr>
                                        <tr>
                                            <td>000817172634</td>
                                            <td>John Doe</td>
                                            <td>83</td>
                                            <td>Jalan Menteng Sukabumi no.13</td>
                                            <td>08181819281</td>
                                            <td>Cancer, Stroke</td>
                                            <td><button className="btn btn-primary btn-sm" onClick={this.handleShowModal}>Detail</button></td>
                                        </tr>
                                        <tr>
                                            <td>000817172634</td>
                                            <td>John Doe</td>
                                            <td>83</td>
                                            <td>Jalan Menteng Sukabumi no.13</td>
                                            <td>08181819281</td>
                                            <td>Cancer, Stroke</td>
                                            <td><button className="btn btn-primary btn-sm" onClick={this.handleShowModal}>Detail</button></td>
                                        </tr>
                                        <tr>
                                            <td>000817172634</td>
                                            <td>John Doe</td>
                                            <td>83</td>
                                            <td>Jalan Menteng Sukabumi no.13</td>
                                            <td>08181819281</td>
                                            <td>Cancer, Stroke</td>
                                            <td><button className="btn btn-primary btn-sm" onClick={this.handleShowModal}>Detail</button></td>
                                        </tr>
                                        <tr>
                                            <td>000817172634</td>
                                            <td>John Doe</td>
                                            <td>83</td>
                                            <td>Jalan Menteng Sukabumi no.13</td>
                                            <td>08181819281</td>
                                            <td>Cancer, Stroke</td>
                                            <td><button className="btn btn-primary btn-sm" onClick={this.handleShowModal}>Detail</button></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>

                <Modal show={this.state.isModalShow} onHide={this.handleCloseModal} size="xl" className="mt-5">
                    <Modal.Header closeButton>
                        <Modal.Title>Detail</Modal.Title>
                    </Modal.Header>
                    
                    <Modal.Body>
                        <div className="row">
                            <div className="col pt-4 pb-4">
                                <h1 className="text-center text-success">83</h1>
                                <h5 className="text-center font-weight-bold">Health Score Anda cukup baik</h5>
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