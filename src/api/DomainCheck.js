import { request } from '../core/request';

class DomainCheckResource {
	get(q) {
		return request(`api/v1/check?name=${q}`);
	}
}

export const DomainCheck = new DomainCheckResource();
