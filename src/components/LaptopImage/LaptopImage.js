import React, { PropTypes } from 'react';
import './LaptopImage.css';

const propTypes = {
	size: PropTypes.shape({
		width: PropTypes.number.isRequired,
		height: PropTypes.number.isRequired
	}).isRequired,
	alignOuterEdges: PropTypes.bool,
	children: PropTypes.node
};

function LaptopImage({ children, size, alignOuterEdges }) {
	const { width, height } = size;
	const margins = alignOuterEdges ? (width * 0.25 - 12) : null;
	return (
		<div
			className="Laptop"
			style={alignOuterEdges ? {
				marginLeft: `${margins}px`,
				marginRight: `${margins}px`
			} : null}
		>
			<div
				className="Laptop__content"
				style={{ width, height }}
			>
				{children}
			</div>
			<div className="Laptop__btm" />
		</div>
	);
}

LaptopImage.propTypes = propTypes;

export default LaptopImage;
