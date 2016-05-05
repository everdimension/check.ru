import React, { PropTypes } from 'react';

function isInside(node, target) {
  for (; node != null; node = node.parentNode) {
    if (node == target) { return true; }
  }
}

class Tooltip extends React.Component {
  static propTypes = {
    children: PropTypes.element.isRequired,
    title: PropTypes.string,
  };

  constructor(props) {
    super(props);
		this.state = {
			rendered: false,
		};
		this.tooltipContainer = document.createElement('div');
    this.tooltipContainer.className = 'TooltipContainer';
  }

  getDefaultProps() {
    return {
      title: '',
    };
  }

	componentWillUnmount() {
		if (this.state.rendered) {
			ReactDOM.unmountComponentAtNode(this.tooltipContainer);
		}
		this.tooltipContainer.remove();
	}

  mount = node => this.el = node;

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
		this.setState({ rendered: false });
  };

  showTooltip = () => {
    document.body.appendChild(this.tooltipContainer);
    ReactDOM.render(
			<div className="Tooltip"
				style={{
					position: 'absolute',
					top: `${this.el.offsetTop + this.el.offsetHeight + 15}px`,
					left: `${this.el.offsetLeft + (this.el.offsetWidth / 2)}px`,
					transform: 'translateX(-50%)',
				}}
			>
				<span>{this.props.title}</span>
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
				ref: this.mount,
      }
    );
  }
}

export default Tooltip;
