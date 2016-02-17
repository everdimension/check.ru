import React, { PropTypes } from 'react';
import './Alert.css';

class Alert extends React.Component {
	static get propTypes() {
		return {
			children: PropTypes.element.isRequired
		};
	}

	render() {
		return (
			<div className="Alert Alert--error">
				{this.props.children}
			</div>
		);
	}

}

export default Alert;
