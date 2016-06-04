import React, { PropTypes } from 'react';
import './StickyFooter.css';
import throttle from 'lodash/throttle';

const WRAPPER_CLASSNAME = 'StickyFooter__wrapper';
const CONTENT_CLASSNAME = 'StickyFooter__content';

class StickyFooter extends React.Component {
	static get propTypes() {
		return {
			children: PropTypes.element,
			wrapperId: PropTypes.string.isRequired,
			contentId: PropTypes.string.isRequired,
			gap: PropTypes.number
		};
	}

	static get defaultProps() {
		return {
			gap: 20
		};
	}

	constructor(props) {
		super(props);
		this.mount = this.mount.bind(this);
		this.updateStyles = this.updateStyles.bind(this);
		this.lastHeight = null;
	}

	componentDidMount() {
		this.wrapperElement = document.getElementById(this.props.wrapperId);
		this.contentElement = document.getElementById(this.props.contentId);

		this.wrapperElement.classList.add(WRAPPER_CLASSNAME);
		this.contentElement.classList.add(CONTENT_CLASSNAME);

		this.updateStyles();
		window.addEventListener('resize', throttle(this.updateStyles, 500));
	}

	shouldComponentUpdate() {
		return false;
	}

	mount(node) {
		this.footerElement = node;
	}

	updateStyles() {
		const newHeight = this.footerElement.offsetHeight;
		if (newHeight === this.lastHeight) {
			return;
		}

		this.lastHeight = newHeight;
		this.contentElement.style.marginBottom = `${newHeight + this.props.gap}px`;
	}

	render() {
		return (
			<div className="StickyFooter" ref={this.mount}>
				{this.props.children}
			</div>
		);
	}
}

export default StickyFooter;
