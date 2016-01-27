import React, { PropTypes } from 'react';
import './App.css';

class App extends React.Component {
	render () {
		return (
			<div className="App content-wrapper row">
				<header className="App__header">
					<div className="row">
						<div className="small-4 columns">left column</div>
						<div className="small-4 columns">
							<span className="PageHeader__logo">
								App
							</span>
						</div>
					</div>
				</header>

				<div className="App__body">
					{this.props.children}

				</div>
			</div>
		);
	}
}

export default App;
