export default function extractDomain(str) {
	let sld;
	let completeName = sld = str.trim();
	let tld = null;

	const dotSplitted = completeName.split('.');
	const len = dotSplitted.length;
	if (len > 2) {
		sld = dotSplitted[len - 2];
		tld = dotSplitted[len - 1];
		completeName = `${sld}.${tld}`;
	} else if (len === 2) {
		sld = dotSplitted[0];
		tld = dotSplitted[1];
	}

	return {
		completeName,
		sld,
		tld
	};
}
