import React from 'react';
import './YandexShare.css';

class YandeShare extends React.Component {
	componentWillMount() {
		const script = document.createElement('script');
		script.setAttribute('src', '//yandex.st/share/share.js');
		document.head.appendChild(script);
	}

	render() {
		return (
			<div
				className="yashare-auto-init YandexShare"
				data-yashareL10n="ru"
				data-yashareQuickServices="yaru,vkontakte,facebook,twitter,gplus"
				data-yashareTheme="counter"
				data-yasharetype="small"
			/>
		);
	}
}

export default YandeShare;
