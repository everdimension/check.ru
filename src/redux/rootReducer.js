import { combineReducers } from 'redux';
import ipInfo from './modules/ipInfo';
import domains from './modules/domains';
import domainData from './modules/domainData';

const rootReducer = combineReducers({
	ipInfo,
	domains,
	domainData
});

export default rootReducer;
