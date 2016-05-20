import React, { PropTypes as t } from 'react';

class AdContainer extends React.Component {
	static get propTypes() {
		return {
			children: t.element.isRequired
		};
	}

	render() {
		return (
			<div className="text-center">
				{this.props.children}
			</div>
		);
	}
}

export default AdContainer;
