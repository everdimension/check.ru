import React, { PropTypes } from 'react'
import './App.css';

class App extends React.Component {
	render () {
		return (
			<div className="App">
				<header className="App__header PageHeader">
					<div className="container">
						<span className="PageHeader__logo">
							App
						</span>

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
