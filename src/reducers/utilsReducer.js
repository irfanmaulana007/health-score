const initialState = {
	loaders: "invisible",
	message: "",
	formError: '',
	pageHeader: '',
}

export default function utilsReducer(state = initialState, action) {
	switch(action.type) {
		case "START_LOADING": 
			return {
				...state,
				loaders: "visible",
				message: action.payload
			}

		case "STOP_LOADING": 
			return {
				...state,
				loaders: "invisible",
				message: ""
			}

		case "FORM_ERROR_HANDLER":
			return {
				...state,
				formError: action.payload
			}

		case "SET_PAGE_HEADER":
			return {
				...state,
				pageHeader: action.payload
			}
			
		default: return state;
	}
}