import axios from 'axios';
import _ from 'lodash';

import { API_URL } from './config';
import { createErrorObject } from '../components/createErrorObject';
// import { createNotification } from '../components/utils/Notifications';

axios.defaults.baseURL = API_URL;
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
axios.interceptors.request.use(
	config => {
		let token = localStorage.getItem('token')
  
		if (token) {
		  config.headers['Authorization'] = `Bearer ${ token }`
		}
	
		return config
	},
	error => {
		return Promise.reject(error);
	}
)

const apiService = {
	get (resource) {
		return axios
			.get(resource)
			.then((res) => {
				return res
			})
            .catch((err) => {
				if (err.response.data.status === "expired") {
					localStorage.clear();
					// createNotification('error', 'Silahkan melakukan login ulang.', 'Session habis');
					// this.props.history.push("/login");
					// window.location("/login");
				} else {
					// createNotification('error', 'Kontak IT Support untuk mengetahui kendala.', 'Terjadi kesalahan');
				}
				createErrorObject(err.response.status);

				throw err;
            })
	},

	put (resource, params) {
		return axios
			.put(resource, params)
            .catch((err) => {
				if (err.response.data.status === "expired") {
					localStorage.clear();
					// createNotification('error', 'Silahkan melakukan login ulang.', 'Session habis');
					// this.props.history.push("/login");
					// window.location("/login");
				} else {
					// createNotification('error', 'Kontak IT Support untuk mengetahui kendala.', 'Terjadi kesalahan');
				}
				createErrorObject(err.response.status);

				throw err;
            })
	},

	post (resource, params) {
		return axios
			.post(resource, params)
            .catch((err) => {
				if (err.response.data.status === "expired") {
					localStorage.clear();
					// createNotification('error', 'Silahkan melakukan login ulang.', 'Session habis');
					// this.props.history.push("/login");
					// window.location = "/login";
				} else {
					console.log(err.response);
					// createNotification('error', _.get(err, 'response.data.message', 'Kontak IT Support untuk mengetahui kendala.'), 'Terjadi kesalahan');
				}
				createErrorObject(err.response.status);

				throw err;
            })
	},

	delete (resource) {
		return axios
			.delete(resource)
            .catch((err) => {
				if (err.response.data.status === "expired") {
					localStorage.clear();
					// createNotification('error', 'Silahkan melakukan login ulang.', 'Session habis');
					// this.props.history.push("/login");
				} else {
					// createNotification('error', 'Kontak IT Support untuk mengetahui kendala.', 'Terjadi kesalahan');
				}
				createErrorObject(err.response.status);

				throw err;
            })
	}
}

export const authService = {
    login (payload) {
        return apiService
            .post('authenticate', payload)
	},
	
	logout () {
		return apiService
			.get('logout')
	}
}

// Transaction
export const SalesService = {
	get () {
		return apiService
			.get('order')
	},
    
	detail (id) {
		return apiService
			.get('order/' + id)
	},
    
	create (payload) {
		return apiService
			.post('order', payload)
	},
    
	update (id, payload) {
		return apiService
			.put('order/' + id, payload)
	},
    
	delete (id) {
		return apiService
			.delete('order/' + id)
	}
}
