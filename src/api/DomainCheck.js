import request from '../core/request';

class DomainCheckResource {
	get(q) {
		return request(`api/v1/check?name=${q}`)
			.catch(err => {
				throw err;
			});
	}
}

export const DomainCheck = new DomainCheckResource();
