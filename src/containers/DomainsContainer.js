import React, { PropTypes } from 'react';
import { fetchDomain } from '../redux/modules/domains';
import DomainSearch from '../components/DomainSearch';
import tlds from '../tlds';

class DomainsContainer extends React.Component {
	static get contextTypes() {
		return {
			store: PropTypes.object
		};
	}

	constructor(props, context) {
		super(props, context);
		this.store = context.store;
		this.state = this.store.getState();

		this.queryDomains = this.queryDomains.bind(this);
	}

	componentWillMount() {
		this.unsubscribe = this.store.subscribe(() => this.setState(this.store.getState()));
	}

	componentWillUnmount() {
		this.unsubscribe();
	}

	queryDomains(domainName, tld) {
		if (tld) {
			this.store.dispatch(
				fetchDomain(tld, domainName)
			);
			return;
		}

		tlds.forEach(domain => this.store.dispatch(
			fetchDomain(domain.tld, domainName)
		));
	}

	render() {
		return (
			<DomainSearch
				domains={this.state.domains}
				onSearch={this.queryDomains}
			/>
		);
	}
}

export default DomainsContainer;
