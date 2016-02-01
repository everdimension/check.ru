import React, { PropTypes } from 'react'
import './Alert.css';

class Alert extends React.Component {
	render () {

		return (
			<div className="Alert Alert--error">
				{this.props.children}
			</div>
		);

	}
}

export default Alert;
