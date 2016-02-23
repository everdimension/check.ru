import jsonResponseHandler from './jsonResponseHandler';

class DomainCheckResource {
	get(q) {
		return fetch(`api/v1/check?name=${q}`)
			.then(jsonResponseHandler)
			.catch(err => {
				throw err;
			});
	}
}

export const DomainCheck = new DomainCheckResource();
