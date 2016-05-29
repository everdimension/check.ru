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
	switch (action.type) {
		case REQUEST_DOMAIN_CHECK:
			return Object.assign({}, state, {
				request: action.request,
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
export function requestDomainCheck(request) {
	return {
		type: REQUEST_DOMAIN_CHECK,
		request
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
	return (dispatch, getState) => {
		const { domainData } = getState();
		if (domainData.isFetching) {
			domainData.request.abort();
		}

		const request = DomainCheck.get(query);
		dispatch(requestDomainCheck(request));

		return request
			.then(res => dispatch(receiveDomainCheck(res)))
			.catch(err => {
				console.error('err', err);
				dispatch(receiveDomainCheck(null, {
					errCode: err.errCode,
					errMessage: err.errMessage
				}));
				throw err;
			});
	};
}
