import React, { PropTypes } from 'react';
import cx from 'classnames';
import './ProgressLine.css';

class ProgressLine extends React.Component {
	static get propTypes() {
		return {
			progress: PropTypes.number.isRequired,
			className: PropTypes.string
		};
	}

	constructor(props) {
		super(props);
		this.state = {
			reset: true,
			progress: 0,
			timer: null
		};
		this.timer = null;
	}

	componentWillReceiveProps(nextProps) {
		const nextProgress = nextProps.progress;
		const { progress } = this.state;

		if (progress === nextProgress || nextProgress === this.props.progress) {
			return;
		}

		if (!nextProgress || nextProgress < progress) {
			this.setState({
				reset: true,
				progress: nextProgress
			});
			return;
		}

		this.setState({
			reset: false,
			progress: nextProgress
		});
	}

	componentDidUpdate() {
		if (!this.state.progress) {
			return;
		}
		if (this.props.progress === 100) {
			if (this.timer) {
				clearTimeout(this.timer);
			}
			this.timer = setTimeout(() => this.setState({
				reset: true,
				progress: 0
			}), 5000);
		}
	}

	componentWillUnmount() {
		if (this.timer) {
			clearTimeout(this.timer);
		}
	}

	render() {
		const { className } = this.props;
		const { progress, reset } = this.state;
		return (
			<div
				className={cx(
					'ProgressLine',
					className,
					{ notransition: reset }
				)}
				style={{ width: `${progress}%` }}
			/>
		);
	}
}

export default ProgressLine;
