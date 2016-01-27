import React from 'react';
import { connect } from 'react-redux';
import IpInfo from '../components/IpInfo';

const mapStateToProps = state => {
	const ip = '2222';
	return {
		ip
	}
};

export default connect(mapStateToProps)(IpInfo);
