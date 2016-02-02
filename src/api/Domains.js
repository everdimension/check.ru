import jsonResponseHandler from './jsonResponseHandler';

class DomainsResource {
	query(tld, q) {
		console.log('DomainsResource query');
		return fetch(`api/v1/domain/${tld}?name=${q}`)
			.then(jsonResponseHandler)
			.catch(err => {
				console.warn('failed to query domains', err);
				throw err;
			});
	}
}

export const Domains = new DomainsResource();
