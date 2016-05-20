export default function jsonResponseHandler(res) {
	console.log('respooonse is...', res);
	return res.body;
	// const isSuccess = res.status >= 200 && res.status < 300;
	// const promise = res.json();
	// return isSuccess ? promise : promise.then(err => Promise.reject(err));
	// return isSuccess ? promise : Promise.reject(promise);
}
