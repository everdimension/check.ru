import React, { PropTypes } from 'react'
import cx from 'classnames'
import './ProgressLine.css'

class ProgressLine extends React.Component {
	render() {
		const { progress, className, reset } = this.props;
		return (
			<div className={cx('ProgressLine', className, { 'notransition': reset })} style={{width: progress + '%'}} />
		);
	}
}

export default ProgressLine
