export function fetchDomains(domain) {

	return whatwgfetch(`/api/check/${domain}`)
		.then(res => {
			if (!res.ok) {
				throw res.json();
			}
			return res.json();
		})
		.then(domain => domain)
		.catch(err => {
			console.warn('err', err);
			throw err;
		});
}
