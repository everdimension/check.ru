import React, { PropTypes } from 'react';
import { fetchDomainCheck } from '../redux/modules/domainData';
import AnalyzeDomainSearch from '../components/AnalyzeDomainSearch';
import AnalyzeDomainResults from '../components/AnalyzeDomainResults';
import Loader from '../components/Loader';
import Alert from '../components/Alert';

class AnalyzeContainer extends React.Component {

	static get contextTypes() {
		return {
			store: PropTypes.object
		};
	}

	constructor(props, context) {
		super(props, context);
		this.store = context.store;
		this.state = this.store.getState();

		this.analyze = this.analyze.bind(this);
	}

	componentWillMount() {
		this.listener = this.store.subscribe(() => {
			this.setState(this.store.getState());
		});
	}

	componentWillUnmount() {
		this.listener();
	}

	analyze(q) {
		console.log('should send to api', q);
		this.store.dispatch(
			fetchDomainCheck(q)
		);
	}

	render() {
		const { isFetching, error } = this.state.domainData;
		const { data } = this.state.domainData;

		return (
			<div>
				<AnalyzeDomainSearch onQuery={this.analyze} />
				{ isFetching &&
					<Loader size="large" centered />
				}
				{ !isFetching && error &&
					<Alert>{error.errMessage || 'Ошибка запроса'}</Alert>
				}
				{ !isFetching && !error && data &&
					<AnalyzeDomainResults
						dns={data.dns}
						http={data.http}
						pagespeed={data.pagespeed}
						whois={data.whois}
					/>
				}
			</div>
		);
	}
}

export default AnalyzeContainer;
