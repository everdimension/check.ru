import React from 'react';

// default LiveInternet code ================================
// =============================================
//
// <!--LiveInternet counter--><script type="text/javascript"><!--
// document.write("
// <a href='//www.liveinternet.ru/click' "+
// "target=_blank>
// <img src='//counter.yadro.ru/hit?t44.1;r"+
// escape(document.referrer)+((typeof(screen)=="undefined")?"":
// ";s"+screen.width+"*"+screen.height+"*"+(screen.colorDepth?
// screen.colorDepth:screen.pixelDepth))+";u"+escape(document.URL)+
// ";"+Math.random()+
// "' alt='' title='LiveInternet' "+
// "border='0' width='31' height='31'><\/a>")
// //--></script><!--/LiveInternet-->
//

function LiveInternetCounter() {
	const urlStart = '//counter.yadro.ru/hit?t44.1';
	const referrerInfo = `;r${escape(document.referrer)}`;
	let screenInfo = '';
	if ('screen' in window) {
		screenInfo = `;s${screen.width}*${screen.height}*${screen.colorDepth || screen.pixelDepth}`;
	}
	const urlInfo = `;u${escape(document.URL)}`;

	const srcContent = `${urlStart}${referrerInfo}${screenInfo}${urlInfo};${Math.random()}`;
	return (
		<a rel="nofollow" href="//www.liveinternet.ru/click" target="_blank">
			<img
				src={srcContent}
				alt="Live Internet"
				title="LiveInternet"
				style={{
					border: 0,
					width: 31,
					height: 31
				}}
			/>
		</a>
	);
}

export default LiveInternetCounter;
