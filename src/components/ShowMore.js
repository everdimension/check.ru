import React, { PropTypes } from 'react';
import cx from 'classnames';

class ShowMore extends React.Component {
	static get propTypes() {
		return {
			text: PropTypes.string,
			expanded: PropTypes.bool,
			target: PropTypes.string,
			className: PropTypes.string
		};
	}

	constructor(props) {
		super(props);
		this.state = {
			expanded: !!props.expanded
		};
		this.toggle = this.toggle.bind(this);
	}

	componentDidMount() {
		this.target = document.getElementById(this.props.target);
		this.target.style.display = this.state.expanded ? 'block' : 'none';
	}

	toggle(evt) {
		evt.preventDefault();
		const expanded = !this.state.expanded;
		this.setState({ expanded });

		this.target.style.display = expanded ? 'block' : 'none';
	}

	render() {
		const { text, className } = this.props;
		const { expanded } = this.state;
		return (
			<a href="#" onClick={this.toggle} className={className}>
				{text}
				{' '}
				<span className={cx(
						'chevron-icon', { 'chevron-icon--down': expanded }
					)}
				/>
			</a>
		);
	}
}

export default ShowMore;
