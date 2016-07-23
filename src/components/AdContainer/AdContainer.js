import React, { PropTypes as t } from 'react';
import './AdContainer.css';

class AdContainer extends React.Component {
	static get propTypes() {
		return {
			children: t.element.isRequired
		};
	}

	render() {
		return (
			<div className="AdContainer text-center">
				{this.props.children}
			</div>
		);
	}
}

export default AdContainer;
