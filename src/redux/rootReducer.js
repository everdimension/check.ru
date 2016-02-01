import { combineReducers } from 'redux';
import ipInfo from './modules/ipInfo';
import domains from './modules/domains';

const rootReducer = combineReducers({
	ipInfo,
	domains
});

export default rootReducer;
