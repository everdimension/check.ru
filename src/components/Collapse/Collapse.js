import React, { PropTypes } from 'react';

class Collapse extends React.Component {
	static get propTypes() {
		return {
			children: PropTypes.any.isRequired
		};
	}

	state = {
		collapsed: true
	};

	handleClick = evt => {
		evt.preventDefault();
		this.setState({
			collapsed: !this.state.collapsed
		});
	};

	render() {
		const child = this.props.children;
		console.log('child', child);
		const title = React.cloneElement(
			this.props.children[0],
			{
				onClick: this.handleClick
			}
		);
		return (
			<div>
				{title}
				{!this.state.collapsed && this.props.children[1]}
			</div>
		);
	}
}

export default Collapse;
