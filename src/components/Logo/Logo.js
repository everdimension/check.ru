import React from 'react';
import './Logo.css';

class Logo extends React.Component {
	render() {
		return (
			<div className="Logo">
				<img src={require('./logo.png')}
					className="Logo__img"
					alt="check.ru logo"
				/>
			</div>
		);
	}
}

export default Logo;
