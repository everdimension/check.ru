import React, { PropTypes } from 'react';
import {
	fetchDomain,
	addDomain,
	populateStandardDomainsIfNeeded,
	setDefaultTlds,
	setTldsToShow
} from '../redux/modules/domains';
import DomainSearch from '../components/DomainSearch';
import tlds from '../config';

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
		this.onSetDefaultTlds = this.onSetDefaultTlds.bind(this);
		this.onSetTldsToShow = this.onSetTldsToShow.bind(this);
	}

	componentWillMount() {
		this.unsubscribe = this.store.subscribe(
			() => this.setState(this.store.getState())
		);
		this.store.dispatch(
			populateStandardDomainsIfNeeded()
		);
	}

	componentWillUnmount() {
		this.unsubscribe();
	}

	onSetDefaultTlds() {
		this.store.dispatch(
			setDefaultTlds()
		);
	}

	onSetTldsToShow(tldsToShow) {
		tldsToShow.forEach(tldName => {
			if (!this.store.getState().domains.data.find(d => d.tld === tldName)) {
				this.store.dispatch(
					addDomain({ tld: tldName })
				);
			}
		});
		this.store.dispatch(
			setTldsToShow(tldsToShow)
		);
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
				onSetDefaultTlds={this.onSetDefaultTlds}
				onSetTldsToShow={this.onSetTldsToShow}
			/>
		);
	}
}

export default DomainsContainer;
