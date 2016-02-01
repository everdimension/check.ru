import React from 'react';
import './Loader.css';
import cx from 'classnames';

class Loader extends React.Component {
	render() {
		const modifierClasses = cx({
			'Loader--large': this.props.size === 'large'
		});
		return (
			<div className={'Loader ' + modifierClasses}></div>
		);
	}
}


export default Loader;
