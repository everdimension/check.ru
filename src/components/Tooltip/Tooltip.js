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

class Tooltip extends React.Component {
	static propTypes = {
		children: PropTypes.element.isRequired,
		title: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
		position: PropTypes.oneOf(['top', 'bottom'])
	};

	static getDefaultProps = {
		title: '',
		position: 'bottom'
	};

	constructor(props) {
		super(props);
		this.state = {
			rendered: false
		};
		this.tooltipContainer = document.createElement('div');
		this.tooltipContainer.className = 'TooltipContainer';
	}

	componentWillUnmount() {
		if (this.state.rendered) {
			ReactDOM.unmountComponentAtNode(this.tooltipContainer);
		}
		this.tooltipContainer.remove();
	}

	mount = node => {
		this.el = node;
	};

	handleMouseOver = evt => {
		const isEntering = !isInside(evt.relatedTarget, this.el);
		if (!isEntering) { return; }
		this.showTooltip();
		this.setState({ rendered: true });
	};

	handleMouseOut = (evt) => {
		const isLeaving = !isInside(evt.relatedTarget, this.el);
		if (!isLeaving) { return; }
		ReactDOM.unmountComponentAtNode(this.tooltipContainer);
		this.tooltipContainer.remove();
		this.setState({ rendered: false });
	};

	showTooltip = () => {
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
					position: 'absolute',
					top: `${tooltipTop}px`,
					left: `${tooltipLeft}px`
				}}
			>
				{typeof this.props.title === 'string' ?
					<span>{this.props.title}</span> :
					this.props.title
				}
			</div>,
			this.tooltipContainer
		);
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
