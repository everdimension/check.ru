import React, { PropTypes } from 'react';
import AnimatedBg from '../AnimatedBg';
import Logo from '../Logo';
import './App.css';

class App extends React.Component {
	static get propTypes() {
		return {
			children: PropTypes.element
		};
	}

	render() {
		return (
			<div className="App">
				<Logo />
				<div className="content-wrapper row">
					<AnimatedBg />
					<header className="App__header">
						{/* <div className="row">
							<div className="small-4 columns">left column</div>
							<div className="small-4 columns">
								<span className="PageHeader__logo">
									App
								</span>
							</div>
						</div> */}
					</header>

					<div className="App__body">
						{this.props.children}
					</div>
				</div>
			</div>
		);
	}
}

export default App;
