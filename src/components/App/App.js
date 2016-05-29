import React, { PropTypes } from 'react';
import AnimatedBg from '../AnimatedBg';
import Logo from '../Logo';
import Footer from '../Footer';
import YandexShare from '../YandexShare';
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
				<AnimatedBg />
				<div className="content-wrapper row">
					<header className="App__header container">
						<Logo />
						<YandexShare />
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

					<Footer />
				</div>
			</div>
		);
	}
}

export default App;
