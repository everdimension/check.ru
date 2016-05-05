import React, { PropTypes } from 'react';
import './Alert.css';

class Alert extends React.Component {
	static get propTypes() {
		return {
			children: PropTypes.any.isRequired
		};
	}

	componentWillMount() {
		console.log('cwm Alert');
	}

	render() {
		return (
			<div className="Alert Alert--error">
				{this.props.children || 'stuff'}
			</div>
		);
	}

}

export default Alert;
