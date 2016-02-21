import jsonResponseHandler from './jsonResponseHandler';

class DomainsResource {
	query(tld, q) {
		return fetch(`api/v1/domain/${tld}?name=${q}`)
			.then(jsonResponseHandler)
			.catch(err => {
				throw err;
			});
	}
}

export const Domains = new DomainsResource();
