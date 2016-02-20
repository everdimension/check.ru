import React, { PropTypes } from 'react'
import Loader from './Loader';
import Alert from './Alert';
import DomainsList from './DomainsList';
import ProgressLine from './ProgressLine';

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
		this.state = {
			showProgress: true
		};
	}

	handleSubmit(evt) {
		evt.preventDefault();
		console.log(evt);
		console.log(evt.target.checkValidity());
		if (evt.target.checkValidity()) {
			this.props.onSearch(evt.target.elements.domain.value);
		}
	}

	render () {
		const { domains } = this.props;
		const { showProgress } = this.state;
		return (
			<div>
				<div className="DomainSearch__search">
					<form onSubmit={this.handleSubmit} noValidate>
						<div className="InputGroup">
							<input type="text" name="domain" placeholder="http://yoursite.com" required />
							<ProgressLine className="InputGroup__progress-line" progress={domains.fetchProgress} />
						</div>
					</form>
				</div>

				<div className="DomainSearch__results">
					{ domains.errorAll &&
						<Alert>
							<p>Some error</p>
						</Alert>
					}
					{ !!domains.data.length &&
					<div className="panel">
						<div className="panel__body">
							{/*domains.isFetching ?
							<Loader /> : null*/
							}
							{domains.data.length ?
							<DomainsList domains={domains.data} fetchDomain={this.props.onSearch} />
							: null}
						</div>
					</div>
					}
				</div>

			</div>
		);
	}
}

export default DomainSearch;
