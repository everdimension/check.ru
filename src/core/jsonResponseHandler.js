export function responseHandler(res) {
	return res.body;
	// const isSuccess = res.status >= 200 && res.status < 300;
	// const promise = res.json();
	// return isSuccess ? promise : promise.then(err => Promise.reject(err));
	// return isSuccess ? promise : Promise.reject(promise);
}

export function errorHandler(err) {
	if (err.response && err.response.body) {
		throw err.response.body;
	}

	throw err;
}
