import React, { PropTypes } from 'react'
import cx from 'classnames';
import './ProgressLine.css'

const ProgressLine = ({ progress, className, reset }) => {
	return (
		<div className={cx('ProgressLine', className, { 'notransition': reset })} style={{width: progress + '%'}} />
	);
};

export default ProgressLine;
