import { DomainCheck } from '../../api/DomainCheck';

export const REQUEST_DOMAIN_CHECK = 'REQUEST_DOMAIN_CHECK';
export const RECEIVE_DOMAIN_CHECK = 'RECEIVE_DOMAIN_CHECK';


// DomainData Reducer
// ============================================
const initialState = {
	isFetching: false,
	data: null
};

export default function (state = initialState, action) {
	console.log('reducing...', action);
	switch (action.type) {
		case REQUEST_DOMAIN_CHECK:
			return Object.assign({}, state, {
				isFetching: true
			});
		case RECEIVE_DOMAIN_CHECK:
			return Object.assign({}, state, {
				isFetching: false,
				data: action.data,
				error: action.error
			});
	}

	return state;
}

// Actions
// ============================================
export function requestDomainCheck() {
	return {
		type: REQUEST_DOMAIN_CHECK
	};
}

export function receiveDomainCheck(data, error) {
	return {
		type: RECEIVE_DOMAIN_CHECK,
		data,
		error
	};
}

export function fetchDomainCheck(query) {
	return dispatch => {
		dispatch(requestDomainCheck());

		return DomainCheck.get(query)
			.then(res => dispatch(receiveDomainCheck(res)))
			.catch(err => {
				dispatch(receiveDomainCheck(null, {
					errCode: err.errCode,
					errMessage: err.errMessage
				}));
				throw err;
			});
	};
}
