import React, { PropTypes } from 'react'
import Loader from './Loader';
import Alert from './Alert';
import DomainsList from './DomainsList';

class DomainSearch extends React.Component {
	static get propTypes() {
		return {
			domains: PropTypes.object.isRequired,
			onSearch: PropTypes.func
		};
	}

	constructor(props) {
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit(evt) {
		evt.preventDefault();
		console.log(evt);
		console.log(evt.target.checkValidity());
		if (evt.target.checkValidity()) {
			this.props.onSearch(evt.target.children.domain.value);
		}
	}

	render () {
		const { domains } = this.props;
		return (
			<div>
				<div className="DomainSearch__search">
					<form onSubmit={this.handleSubmit} noValidate>
						<input type="text" name="domain" placeholder="http://yoursite.com" required />
					</form>
				</div>

				<div className="DomainSearch__results">
					{ domains.error &&
						<Alert>
							<p>Some error</p>
						</Alert>
					}
					<div className="panel">
						<div className="panel__body">
							{/*domains.isFetching ?
							<Loader /> : null*/
							}
							{domains.data.length ?
							<DomainsList domains={domains.data} />
							: null}
						</div>
					</div>
				</div>

			</div>
		);
	}
}

export default DomainSearch;
