import React, { PropTypes } from 'react'

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
					<div className="small-12 columns">{domain.tld}</div>
				))}
			</div>
		)
	}
}

export default DomainsList;
