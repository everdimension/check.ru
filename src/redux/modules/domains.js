import { List, Map } from 'immutable';
import { Domains } from '../../api/Domains';
import tlds from '../../tlds';

const initialState = {
	data: [],
	isFetching: false,
	fetchProgress: 0,
	populated: false
};
export default function domains(state = initialState, action) {
	switch (action.type) {

		case REQUEST_DOMAIN:
			return Object.assign({}, state, {
				data: state.data.map((domain) => {
					if (domain.tld === action.tld) {
						return domainReducer(domain, action);
					}
					return domain;
				}),
				isFetching: true
			});

		case RECEIVE_DOMAIN:
			const newState = Object.assign({}, state, {
				data: state.data.map(domain => {
					if (domain.tld == action.tld) {
						return domainReducer(domain, action);
					}
					return domain;
				})
			});
			return Object.assign({}, newState, {
				isFetching: newState.data.some(domain => domain.isFetching),
				fetchProgress: (newState.data.filter(domain => !domain.isFetching).length / newState.data.length) * 100,
				error: newState.data.some(domain => domain.error),
				errorAll: newState.data.every(domain => domain.error)
			});

		case ADD_DOMAIN:
			return Object.assign({}, state, {
				data: [...state.data, domainReducer(null, action)],
				populated: true
			});

	}

	return state;
}

const initialDomainState = {
	tld: '',
	isFetching: false,
	data: null
};

function domainReducer(state = initialDomainState, action) {
	switch (action.type) {
		case REQUEST_DOMAIN:
			return Object.assign({}, state, {
				isFetching: true,
				data: action.data
			});
		case RECEIVE_DOMAIN:
			const newState = Object.assign({}, state, {
				isFetching: false,
				data: action.data || state.data,
				error: action.error
			});
			return newState;
		case ADD_DOMAIN:
			return {
				tld: action.domain.tld,
				isFetching: action.domain.isFetching || false,
				data: action.domain.data || null
			};
	}

	return state;
}


export const ADD_DOMAIN = 'ADD_DOMAIN';
export function addDomain(domain) {
	return {
		type: ADD_DOMAIN,
		domain
	};
}

export const REQUEST_DOMAIN = 'REQUEST_DOMAIN';
export function requestDomain(tld, query) {
	return {
		type: REQUEST_DOMAIN,
		tld,
		data: {
			full_name: `${query}.${tld}`,
			sld: query
		}

	};
}

export const RECEIVE_DOMAIN = 'RECEIVE_DOMAIN';
export function receiveDomain(tld, data, error) {
	return {
		type: RECEIVE_DOMAIN,
		tld,
		data,
		error
	};
}

export function fetchDomain(tld, query) {
	return (dispatch, getState) => {
		if (!getState().domains.populated) {
			for (let tld of tlds) {
				dispatch(addDomain({ tld }));
			}
		}
		dispatch(requestDomain(tld, query));

		return Domains.query(tld, query)
			.then( res => dispatch(receiveDomain(tld, res)) )
			.catch(err => {
				dispatch(receiveDomain(tld, null, true));
				return err;

				// throw err;
			});
	};
}
