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
			<ul className="List List--unstyled List--md">
				{domains.map(domain => (
					domain.isFetching ?
					<li key={domain.tld} className="List__item">
						{domain.data && domain.data.full_name || domain.tld}
						{' '}
						{domain.isFetching ? <Loader /> : ''}
						{!domain.isFetching ?
							<span className="text-success check-icon"></span> : ''}
					</li>
					:
					<li key={domain.tld} className="List__item">
						{domain.data.full_name || domain.tld}
						{' '}
						{domain.data.available && <span className="text-success check-icon"></span>}
						{!domain.data.available && <span className="text-danger cross-icon"></span>}
					</li>
				))}
			</ul>
		)
	}
}

export default DomainsList;
