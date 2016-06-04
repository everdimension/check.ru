import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import './Tooltip.css';
import cx from 'classnames';

function isInside(node, target) {
	while (node) {
		if (node === target) { return true; }
		node = node.parentNode; // eslint-disable-line no-param-reassign
	}
	return false;
}

const DEFAULT_WAIT_TIME = 600;

class Tooltip extends React.Component {
	static propTypes = {
		children: PropTypes.element.isRequired,
		title: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
		position: PropTypes.oneOf(['top', 'bottom']),
		waitBeforeClose: PropTypes.oneOfType([PropTypes.bool, PropTypes.number])
	};

	static getDefaultProps = {
		title: '',
		position: 'bottom',
		waitBeforeClose: false
	};

	constructor(props) {
		super(props);

		const { waitBeforeClose } = this.props;
		const WAIT_TIME = typeof waitBeforeClose === 'number' ? waitBeforeClose : DEFAULT_WAIT_TIME;
		this.state = {
			rendered: false,
			WAIT_TIME
		};

		this.tooltipContainer = document.createElement('div');
		this.tooltipContainer.className = 'TooltipContainer';
	}

	componentWillReceiveProps(nextProps) {
		const { waitBeforeClose } = this.props;
		const newWaitBeforeClose = nextProps.waitBeforeClose;
		if (newWaitBeforeClose !== waitBeforeClose) {
			const WAIT_TIME = typeof newWaitBeforeClose === 'number' ?
				newWaitBeforeClose :
				DEFAULT_WAIT_TIME;

			this.setState({ WAIT_TIME });
		}
	}

	componentWillUnmount() {
		if (this.state.rendered) {
			ReactDOM.unmountComponentAtNode(this.tooltipContainer);
		}
		this.tooltipContainer.remove();
		if (this.timer) {
			clearTimeout(this.timer);
		}
	}

	mount = node => {
		this.el = node;
	};

	mountTooltip = node => {
		this.tooltipEl = node;
	};

	handleMouseOver = evt => {
		const isEntering = !isInside(evt.relatedTarget, this.el);
		if (!isEntering) { return; }

		if (this.state.rendered && this.scheduleRemove) {
			this.cancelScheduledRemove();
		} else {
			this.showTooltip();
			this.setState({ rendered: true });
		}
	};

	handleMouseOut = evt => {
		const isLeaving = !isInside(evt.relatedTarget, this.el);
		if (!isLeaving) { return; }

		console.log('mouse out...');
		if (this.props.waitBeforeClose) {
			console.log('will scheduleRemove');
			this.scheduleRemove();
		} else {
			this.removeTooltip();
		}
	};

	scheduleRemove = () => {
		this.scheduledRemove = setTimeout(this.removeTooltip, this.state.WAIT_TIME);
	};

	cancelScheduledRemove = () => {
		clearTimeout(this.scheduledRemove);
		this.scheduledRemove = null;
	};

	handleMouseOverTooltip = evt => {
		const isEntering = !isInside(evt.relatedTarget, this.tooltipEl);
		if (!isEntering) { return; }

		if (this.scheduledRemove) {
			this.cancelScheduledRemove();
		}
	};

	handleMouseOutOfTooltip = evt => {
		const isLeaving = !isInside(evt.relatedTarget, this.tooltipEl);
		if (!isLeaving) { return; }
		this.scheduleRemove();
	};

	showTooltip = () => {
		if (this.state.rendered) {
			return;
		}
		const { position } = this.props;
		const { el } = this;
		const { left, top } = el.getBoundingClientRect();
		const posLeft = left + document.body.scrollLeft;
		const posTop = top + document.body.scrollTop;

		let tooltipTop = posTop;
		if (position === 'bottom') {
			tooltipTop += el.offsetHeight;
			tooltipTop += 10;
		}
		if (position === 'top') {
			tooltipTop -= 10;
		}

		const tooltipLeft = posLeft + (el.offsetWidth / 2);

		document.body.appendChild(this.tooltipContainer);
		ReactDOM.render(
			<div
				className={cx('Tooltip', {
					'Tooltip--top': position === 'top'
				})}
				style={{
					top: `${tooltipTop}px`,
					left: `${tooltipLeft}px`
				}}
				ref={this.mountTooltip}
				onMouseOver={this.handleMouseOverTooltip}
				onMouseOut={this.handleMouseOutOfTooltip}
			>
				{typeof this.props.title === 'string' ?
					<span>{this.props.title}</span> :
					this.props.title
				}
			</div>,
			this.tooltipContainer
		);
	};

	removeTooltip = () => {
		ReactDOM.unmountComponentAtNode(this.tooltipContainer);
		this.tooltipContainer.remove();
		this.setState({ rendered: false });
	};

	render() {
		return React.cloneElement(
			this.props.children,
			{
				onMouseOver: this.handleMouseOver,
				onMouseOut: this.handleMouseOut,
				ref: this.mount
			}
		);
	}
}

export default Tooltip;
