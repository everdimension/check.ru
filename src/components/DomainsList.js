import React, { PropTypes } from 'react'
import Loader from './Loader';

class DomainsList extends React.Component {
	static get propTypes() {
		return {
			domains: PropTypes.array.isRequired
		};
	}
	render () {
		const { domains } = this.props;
		return (
			<div className="row">
				{domains.map(domain => (
					<div key={domain.tld} className="small-12 columns">
						{domain.isFetching ? <Loader /> : ''}
						{' '}
						{domain.data && domain.data.full_name || domain.tld}
					</div>
				))}
			</div>
		)
	}
}

export default DomainsList;
