import superagent from 'superagent';
import superagentPromisePlugin from 'superagent-promise-plugin';
import { responseHandler, errorHandler } from './jsonResponseHandler';

superagentPromisePlugin.Promise = Promise;

export function request(resourceUrl) {
	const requestObject = superagent
		.get(resourceUrl)
		.use(superagentPromisePlugin);

	const promise = requestObject
		.then(responseHandler)
		.catch(errorHandler);
	promise.abort = requestObject.abort.bind(requestObject);
	return promise;
}

export function post(resourceUrl, data) {
	const requestObject = superagent
		.post(resourceUrl)
		.send(data)
		.use(superagentPromisePlugin);

	const promise = requestObject
		.then(responseHandler)
		.catch(errorHandler);

	promise.abort = requestObject.abort.bind(requestObject);
	return promise;
}
