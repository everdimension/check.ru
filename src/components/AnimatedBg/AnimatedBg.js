import React from 'react';
require('../../lib/AnimatedBackground/TweenLite.min.js');
require('../../lib/AnimatedBackground/EasePack.min.js');
require('../../lib/AnimatedBackground/rAF.js');
require('../../lib/AnimatedBackground/main.js');
import './AnimatedBg.css';

class AnimatedBg extends React.Component {
	componentDidMount() {
		if (window.AnimatedBg) {
			window.AnimatedBg.init();
		}
	}

	render() {
		return (
			<div id="bg">
				<canvas id="bgCanvas" />
			</div>
		);
	}
}

export default AnimatedBg;
