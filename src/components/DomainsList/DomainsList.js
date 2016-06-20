import React, { PropTypes } from 'react';
import DomainItem from '../DomainItem';

class DomainsList extends React.Component {
	static get propTypes() {
		return {
			domains: PropTypes.array.isRequired,
			fetchDomain: PropTypes.func
		};
	}

	render() {
		const { domains } = this.props;
		const oneResult = domains.length === 1;
		return (
			<ul className="List List--unstyled List--md">
				{domains.map(domain => (
					<DomainItem className="List__item"
						key={domain.tld}
						domain={domain}
						refetch={this.props.fetchDomain}
						expanded={oneResult}
					/>
				))}
			</ul>
		);
	}
}

export default DomainsList;
