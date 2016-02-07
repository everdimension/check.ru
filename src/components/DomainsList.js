import React, { PropTypes } from 'react'
import Loader from './Loader';

class DomainsList extends React.Component {
	static get propTypes() {
		return {
			domains: PropTypes.array.isRequired,
			fetchDomain: PropTypes.func
		};
	}

	constructor(props) {
		super(props);
		this.fetchDomain = this.fetchDomain.bind(this);
	}

	fetchDomain(evt) {
		evt.preventDefault();
		const tld = evt.target.getAttribute('data-tld');
		const sld = evt.target.getAttribute('data-sld');
		this.props.fetchDomain(sld, tld);
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
						<Loader />
					</li>

					: !domain.error ?
					<li key={domain.tld} className="List__item">
						{domain.data.full_name || domain.tld}
						{' '}
						{domain.data.available && <span className="text-success check-icon"></span>}
						{!domain.data.available && <span className="text-danger cross-icon"></span>}
					</li>

					:
					<li key={domain.tld} className="List__item text-muted">
						<span className="circled-icon">
							<span className="cross-icon"></span>
						</span>
						{' '}
						{domain.data.full_name}
						<i>
							&mdash;&nbsp;ошибка&nbsp;ответа от сервера.
							{' '}
							<a href="#"
								data-sld={domain.data.sld}
								data-tld={domain.tld}
								onClick={this.fetchDomain}>
								Попробуйте снова
							</a>
						</i>
					</li>

				))}
			</ul>
		)
	}
}

export default DomainsList;
