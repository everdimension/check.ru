import { Domains } from '../../api/Domains';
import tlds from '../../config';

export const ADD_DOMAIN     = 'ADD_DOMAIN';
export const REQUEST_DOMAIN = 'REQUEST_DOMAIN';
export const REQUEST_CANCEL = 'REQUEST_CANCEL';
export const RECEIVE_DOMAIN = 'RECEIVE_DOMAIN';
export const CLEAR_DOMAINS  = 'CLEAR_DOMAINS';
export const TOGGLE_SINGLE_DOMAIN  = 'TOGGLE_SINGLE_DOMAIN';
export const SET_TLDS_TO_SHOW  = 'SET_TLDS_TO_SHOW';

// Domain Reducer =============================
// ============================================
const initialDomainState = {
	tld: '',
	isFetching: false,
	fetched: false,
	data: null
};

function domainReducer(state = initialDomainState, action) {
	console.log('reducing domain', action);
	switch (action.type) {
		case REQUEST_DOMAIN:
			return Object.assign({}, state, {
				fetched: false,
				isFetching: true,
				data: action.data,
				request: action.request
			});

		case REQUEST_CANCEL:
			return Object.assign({}, state, {
				isFetching: false
			});

		case RECEIVE_DOMAIN: {
			const newState = Object.assign({}, state, {
				isFetching: false,
				fetched: true,
				data: action.data || state.data,
				error: action.error
			});
			return newState;
		}

		case CLEAR_DOMAINS:
			return Object.assign({}, state, {
				tld: action.tld,
				price: action.price
			});

		case ADD_DOMAIN:
			return Object.assign({}, state, {
				tld: action.domain.tld,
				price: action.domain.price,
				registerLink: action.domain.registerLink,
				isFetching: action.domain.isFetching || state.isFetching,
				data: action.domain.data || state.data
			});
	}

	return state;
}

// Domains Reducer =============================
// =============================================
const initialState = {
	data: [],
	showSingleDomain: false,
	tldsToShow: [],
	isFetching: false,
	fetchProgress: 0,
	populated: false
};
export default function domains(state = initialState, action) {
	switch (action.type) {

		case REQUEST_CANCEL:
		case REQUEST_DOMAIN: {
			const stateAfter = Object.assign({}, state, {
				data: state.data.map(domain => {
					if (domain.tld === action.tld) {
						return domainReducer(domain, action);
					}
					return domain;
				})
			});
			const notFetchingDomains = stateAfter.data
									.filter(domain => !domain.isFetching);
			return Object.assign({}, stateAfter, {
				isFetching: true,
				fetchProgress: (notFetchingDomains.length / stateAfter.data.length) * 100
			});
		}

		case RECEIVE_DOMAIN: {
			const newState = Object.assign({}, state, {
				data: state.data.map(domain => {
					if (domain.tld === action.tld) {
						return domainReducer(domain, action);
					}
					return domain;
				})
			});
			const notFetchingDomains = newState.data
									.filter(domain => !domain.isFetching);
			return Object.assign({}, newState, {
				isFetching: newState.data.some(domain => domain.isFetching),
				fetchProgress: (notFetchingDomains.length / newState.data.length) * 100,
				error: newState.data.some(domain => domain.error),
				errorAll: newState.data.every(domain => domain.error)
			});
		}

		case CLEAR_DOMAINS:
			return Object.assign({}, state, {
				data: state.data.map(
					domain => domainReducer(undefined, {
						type: action.type,
						tld: domain.tld,
						price: domain.price
					})
				)
			});

		case ADD_DOMAIN: {
			return Object.assign({}, state, {
				data: [...state.data, domainReducer(undefined, action)],
				populated: true
			});
		}

		case SET_TLDS_TO_SHOW: {
			return Object.assign({}, state, {
				tldsToShow: action.tldsToShow
			});
		}

		case TOGGLE_SINGLE_DOMAIN: {
			return Object.assign({}, state, {
				showSingleDomain: action.showSingleDomain
			});
		}

	}

	return state;
}

// Selectors ================================
// ==========================================
function getPendingDomains(state) {
	return state.domains.data.filter(domain => domain.isFetching);
}

// Actions ================================
// ========================================

export function addDomain(domain) {
	return {
		type: ADD_DOMAIN,
		domain
	};
}

export function requestDomain(tld, query, request) {
	return {
		type: REQUEST_DOMAIN,
		tld,
		data: {
			full_name: `${query}.${tld}`,
			sld: query
		},
		request
	};
}

export function cancelRequest(tld) {
	return {
		type: 'REQUEST_CANCEL',
		tld
	};
}

export function receiveDomain(tld, data, error) {
	return {
		type: RECEIVE_DOMAIN,
		tld,
		data,
		error
	};
}

export function clearDomains() {
	return { type: CLEAR_DOMAINS };
}

export function showSingleDomain(bool) {
	return {
		type: TOGGLE_SINGLE_DOMAIN,
		showSingleDomain: bool
	};
}

export function populateStandardDomainsIfNeeded() {
	return (dispatch, currentState) => {
		console.log('currentState', currentState());
		if (!currentState().domains.populated) {
			console.log('not populated');
			for (const domain of tlds) {
				dispatch(addDomain(domain));
			}
		}
	};
}

export function setTldsToShow(tldsToShow) {
	return {
		type: SET_TLDS_TO_SHOW,
		tldsToShow
	};
}

export function setDefaultTlds() {
	return dispatch => dispatch(
		setTldsToShow(tlds.map(t => t.tld))
	);
}

export function fetchDomain(tld, query) {
	return (dispatch, getState) => {
		const currentState = getState();

		// abort if same domain is currently being fetched
		const pendingDomain = getPendingDomains(currentState).find(d => d.tld === tld);
		if (pendingDomain) {
			pendingDomain.request.abort();
			dispatch(cancelRequest(tld));
		}

		const request = Domains.query(tld, query);
		dispatch(requestDomain(tld, query, request));

		return request
			.then(res => dispatch(receiveDomain(tld, res)))
			.catch(err => {
				dispatch(receiveDomain(tld, null, true));
				throw err;
			});
	};
}
