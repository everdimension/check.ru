import 'babel-polyfill';
import 'normalize.css/normalize.css';
require('./components/styles/foundation.scss');

import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import store from './store';
import HomePage from './pages/HomePage';
import DomainsCheckPage from './pages/DomainsCheckPage';
import DomainsAnalyticsPage from './pages/DomainsAnalyticsPage';
import App from './components/App';

function render() {
	ReactDOM.render(
		<Provider store={store}>
			<Router history={browserHistory}>
				<Route component={App}>
					<Route path="/" component={HomePage}>
						<IndexRoute component={DomainsCheckPage} />
						<Route path="analytics" component={DomainsAnalyticsPage} />
					</Route>
				</Route>
				<Route path="/dom" component={DomainsCheckPage} />
			</Router>
		</Provider>,
		document.getElementById('app')
	);
}


function run() {
	render();
}

if (['complete', 'loaded', 'interactive'].indexOf(document.readyState) !== -1 && document.body) {
	run();
} else {
	document.addEventListener('DOMContentLoaded', run, false);
}
