import React, { PropTypes } from 'react';
import './Loader.css';
import cx from 'classnames';

class Loader extends React.Component {

	static get propTypes() {
		return {
			size: PropTypes.string,
			centered: PropTypes.bool
		};
	}

	render() {
		const modifierClasses = cx({
			'Loader--large': this.props.size === 'large',
			'Loader--centered': this.props.centered
		});
		return (
			<div className={`Loader ${modifierClasses}`}></div>
		);
	}
}


export default Loader;
