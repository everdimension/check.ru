import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

import 'normalize.css/normalize.css';
require('./components/styles/foundation.scss');

function render() {
	ReactDOM.render(
		<App>
			<div className="container">
				<p>page content</p>
			</div>
		</App>,
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
