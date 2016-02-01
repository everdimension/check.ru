import jsonResponseHandler from './jsonResponseHandler';

class DomainsResource {
	query(q) {
		console.log('DomainsResource query');
		return fetch(`api/v1/domains?q=example.com`)
			.then(jsonResponseHandler)
			.catch(err => {
				console.warn('failed to query domains', err);
				throw err;
			});
	}
}

export const Domains = new DomainsResource();
