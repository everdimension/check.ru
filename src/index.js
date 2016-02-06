import 'normalize.css/normalize.css';
require('./components/styles/foundation.scss');

import React from 'react';
import ReactDOM from 'react-dom';
import  { Router, Route, IndexRoute } from 'react-router';
import { Provider } from 'react-redux';
import store from './store';
import HomePage from './pages/HomePage';
import App from './components/App';
import { addDomain } from './redux/modules/domains';

function render() {
	ReactDOM.render(
		<Provider store={store}>
			<App>
				<HomePage />
			</App>
		</Provider>,
		document.getElementById('app')
	);
}


function run(argument) {
	render();
}

if (['complete', 'loaded', 'interactive'].indexOf(document.readyState) !== -1 && document.body) {
	run();
} else {
	document.addEventListener('DOMContentLoaded', run, false);
}
