import axios from 'axios';
import _ from 'lodash';

import { API_URL, API_DS_URL } from './config';
import { createErrorObject } from '../components/createErrorObject';
// import { createNotification } from '../components/utils/Notifications';

// axios.defaults.baseURL = API_URL;
// axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
// axios.interceptors.request.use(
// 	config => {
// 		let token = localStorage.getItem('token')
  
// 		if (token) {
// 		  config.headers['Authorization'] = `Bearer ${ token }`
// 		}
	
// 		return config
// 	},
// 	error => {
// 		return Promise.reject(error);
// 	}
// )
const healthScore = axios.create({
	baseURL: API_URL,
	headers: {
	  'Accept': 'application/json',
	  'Content-Type': 'application/json',
	  'Access-Control-Allow-Origin': '*',
	}
});

const healthScoreDS = axios.create({
	baseURL: API_DS_URL,
	headers: {
	  'Accept': 'application/json',
	  'Content-Type': 'application/json',
	  'Access-Control-Allow-Origin': '*',
	}
});

const apiService = {
	get (resource) {
		return healthScore
			.get(resource)
			.then((res) => {
				return res
			})
            .catch((err) => {
				createErrorObject(err.response.status);

				throw err;
            })
	},

	put (resource, params) {
		return healthScore
			.put(resource, params)
            .catch((err) => {
				createErrorObject(err.response.status);

				throw err;
            })
	},

	post (resource, params) {
		return healthScore
			.post(resource, params)
            .catch((err) => {
				createErrorObject(err.response.status);

				throw err;
            })
	},

	delete (resource) {
		return healthScore
			.delete(resource)
            .catch((err) => {
				createErrorObject(err.response.status);

				throw err;
            })
	}
}

const apiServiceDS = {
	post (resource, params) {
		return healthScoreDS
			.post(resource, params)
            .catch((err) => {
				createErrorObject(err);

				throw err;
            })
	},
}

export const DSService = {
	calculateHealthScore (payload) {
		return apiServiceDS
			.post('', payload)
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

export const IllnessService = {
	getCriticalICD () {
		return apiService
			.get('critical-illness-icd')
	},
    
	getGeneralICD () {
		return apiService
			.get('general-illness-icd')
	},
    
	getMentalICD () {
		return apiService
			.get('mental-illness-icd')
	}
}

export const HealthScoreService = {
	calculateHealthScore (payload) {
		return apiService
			.post('calculate-health-score', payload)
	}
}
