import React, { PropTypes as t } from 'react';

class GoogleAd extends React.Component {
	static get propTypes() {
		return {
			adClientKey: t.string.isRequired,
			adSlotNumber: t.string.isRequired,
			width: t.oneOfType([t.string, t.number]).isRequired,
			height: t.oneOfType([t.string, t.number]).isRequired
		};
	}

	constructor() {
		super();
		this.mount = this.mount.bind(this);
	}

	componentWillMount() {
		const script = document.createElement('script');
		script.setAttribute('src', '//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js');
		document.head.appendChild(script);
	}

	componentDidMount() {
		(window.adsbygoogle = window.adsbygoogle || []).push({});
	}

	mount(node) {
		this.rootNode = node;
	}

	render() {
		const { adClientKey, adSlotNumber, width, height } = this.props;
		if (__DEV__) { // eslint-disable-line no-undef
			return <img src="http://placehold.it/160x600" alt="" />;
		}

		return (
			<div id="adContainer" mount={this.mount}>
				<ins className="adsbygoogle"
					style={{ display: 'inline-block', width, height }}
					data-ad-test="on"
					data-ad-client={adClientKey}
					data-ad-slot={adSlotNumber}
				/>
			</div>
		);
	}
}

export default GoogleAd;
