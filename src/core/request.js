import superagent from 'superagent';
import superagentPromisePlugin from 'superagent-promise-plugin';
import jsonResponseHandler from './jsonResponseHandler';

superagentPromisePlugin.Promise = Promise;

function request(path) {
	const requestObject = superagent
		.get(path)
		.use(superagentPromisePlugin);

	const promise = requestObject
		.then(jsonResponseHandler);
	promise.abort = requestObject.abort.bind(requestObject);
	return promise;
}

export default request;
