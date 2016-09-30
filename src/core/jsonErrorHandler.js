export default function jsonErrorHandler(err) {
	if (err.response && err.response.body) {
		throw err.response.body;
	}

	throw err;
}
