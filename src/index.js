import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

import 'normalize.css/normalize.css';
require('./components/styles/foundation.scss');

function render() {
	ReactDOM.render(
		<App>
			<div className="row">
				<div className="small-12 column">
					<p>page content inside a <code>.row</code></p>
				</div>
			</div>
			<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias, distinctio!</p>

			<div className="panel">
				<div className="panel__body">
					mega panel
				</div>
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
