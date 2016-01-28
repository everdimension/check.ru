function jsonResponseHandler(res) {
	const isSuccess = res.status >= 200 && res.status < 300;
	const promise = res.json();
	console.log('isSuccess', isSuccess);
	return isSuccess ? promise : promise.then(res => Promise.reject(res));
}

class IpInfoClass {
	get() {
		return fetch('api/v1/info')
			.then(jsonResponseHandler)
			.catch(err => {
				console.warn('err info', err);
				throw err;
			});
	}
}

export const IpInfo = new IpInfoClass();

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
