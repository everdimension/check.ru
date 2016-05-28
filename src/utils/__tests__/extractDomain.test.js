import test from 'tape';
import extractDomain from '../extractDomain';

test('extractDomain', t => {
	t.test('works', assert => {
		const res = extractDomain('rnd');
		assert.ok(
			typeof res === 'object',
			`returns an object ${JSON.stringify(res)}`
		);
		assert.end();
	});

	t.test('simple input (\'something\')', assert => {
		const { completeName } = extractDomain('something');
		assert.equal(
			completeName,
			'something', 'returns original string for simple input'
		);
		assert.end();
	});

	t.test('full domain (\'something.com\')', assert => {
		const { completeName, sld, tld } = extractDomain('something.com');
		assert.equal(
			tld,
			'com',
			`extracts "${tld}" as tld`
		);
		assert.equal(
			completeName,
			'something.com',
			`extracts "${completeName}" as completeName`
		);
		assert.equal(
			sld,
			'something',
			`extracts "${sld}" as sld`
		);
		assert.end();
	});

	t.test('full domain with subdomain (\'subdomain.maindomain.com\')', assert => {
		const { completeName, sld, tld } = extractDomain('subdomain.maindomain.com');
		assert.equal(
			tld,
			'com',
			`subdomain — extracts "${tld}" as tld`
		);
		assert.equal(
			sld,
			'maindomain',
			`subdomain — extracts "${sld}" as sld`
		);
		assert.equal(
			completeName,
			'maindomain.com',
			`subdomain — extracts "${completeName}" as completeName`
		);
		assert.end();
	});

});
