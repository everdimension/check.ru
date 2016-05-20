import request from '../core/request';

class DomainsResource {
	query(tld, q) {
		return request(`api/v1/domain/${tld}?name=${q}`);
	}
}

export const Domains = new DomainsResource();
