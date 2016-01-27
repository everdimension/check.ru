function jsonResponseHandler(res) {
	const isSuccess = res.status >= 200 && res.status < 300;
	const promise = res.json();
	return isSuccess ? promise : promise.then(res => Promise.reject(res));
}

export function fetchDomains(domain) {

	return fetch(`/api/v1/check/${domain}`)
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

export function fetchClientInfo() {
	return fetch('api/v1/info')
		.then(jsonResponseHandler)
		.catch(err => {
			console.warn('err info', err);
			throw err;
		});
}
