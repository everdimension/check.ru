import React, { PropTypes } from 'react'
import { addDomain, fetchDomain } from '../redux/modules/domains';
import DomainSearch from '../components/DomainSearch';

class DomainsContainer extends React.Component {
	constructor(props, context) {
		super(props, context);
		this.store = context.store;
		this.state = this.store.getState();

		this.queryDomains = this.queryDomains.bind(this);
	}
	componentWillMount() {
		this.store.subscribe(() => this.setState(this.store.getState()));
	}

	queryDomains(domainName) {
		console.log('must query domains', domainName);
		this.store.dispatch(
			fetchDomain(domainName)
		);

	}

	render () {
		return (
			<DomainSearch
				domains={this.state.domains}
				onSearch={this.queryDomains}
			/>
		);
	}
}

DomainsContainer.contextTypes = {
	store: PropTypes.object
};

export default DomainsContainer;
