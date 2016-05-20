import request from '../core/request';

class IpInfoClass {
	get() {
		console.log('using REQUEST');
		return request('api/v1/info')
			.catch(err => {
				throw err;
			});
	}
}

export const IpInfo = new IpInfoClass();
