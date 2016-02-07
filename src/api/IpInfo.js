import jsonResponseHandler from './jsonResponseHandler';

class IpInfoClass {
	get() {
		return fetch('api/v1/info')
			.then(jsonResponseHandler)
			.catch(err => {
				throw err;
			});
	}
}

export const IpInfo = new IpInfoClass();
