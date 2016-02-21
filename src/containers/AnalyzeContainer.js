import React, { PropTypes } from 'react';
import AnalyzeDomainSearch from '../components/AnalyzeDomainSearch';
import AnalyzeDomainResults from '../components/AnalyzeDomainResults';

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

	analyze(q) {
		console.log('should send to api', q);
	}

	render() {
		return (
			<div>
				<AnalyzeDomainSearch
					onQuery={this.analyze}
				/>
				<AnalyzeDomainResults />
			</div>
		);
	}
}

export default AnalyzeContainer;
