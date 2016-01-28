import { Map } from 'immutable';
import { IpInfo } from '../../api/IpInfo';

const initialState = Map({
	data: null,
	isFetching: false
});

export default function ipInfo(state = initialState, action) {
	switch (action.type) {
		case REQUEST_IP_INFO:
			return state.set('isFetching', true);
		case RECEIVE_IP_INFO:
			return state
				.set('isFetching', false)
				.set('data', action.data);
	}

	return state;
}

export const REQUEST_IP_INFO = 'REQUEST_IP_INFO';
export function requestIpInfo() {
	return {
		type: REQUEST_IP_INFO
	};
}

export const RECEIVE_IP_INFO = 'RECEIVE_IP_INFO';
export function receiveIpInfo(data) {
	return {
		type: RECEIVE_IP_INFO,
		data
	};
}

export function fetchIpInfo() {
	return dispatch => {
		dispatch(requestIpInfo());

		return IpInfo.get()
			.then(res => {
				console.log('got res', res);
				dispatch(receiveIpInfo(res));
			})
			.catch(err => {
				console.warn('failed to load ip info');
				throw err;
			});
	}
}
