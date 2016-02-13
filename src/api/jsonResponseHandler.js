export default function jsonResponseHandler(res) {
	const isSuccess = res.status >= 200 && res.status < 300;
	// const promise = res.json();
	// return isSuccess ? promise : promise.then(res => Promise.reject(res));
	return isSuccess ? res.json() : Promise.reject(res.statusText);
}