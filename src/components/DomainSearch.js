import React, { PropTypes } from 'react';
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
		this.focusTab = this.focusTab.bind(this);
		this.unFocusTab = this.unFocusTab.bind(this);
	}

	focusTab() {
		console.log('onFocus fn');
		document.getElementById('whoisTab').classList.add('focused');
	}

	unFocusTab() {
		document.getElementById('whoisTab').classList.remove('focused');
	}

	handleSubmit(evt) {
		evt.preventDefault();
		if (evt.target.checkValidity()) {
			this.props.onSearch(evt.target.elements.domain.value);
		}
	}

	render() {
		const { domains } = this.props;
		return (
			<div>
				<div className="DomainSearch__search">
					<form onSubmit={this.handleSubmit} noValidate>
						<div className="InputGroup">
							<div className="InputWrapper">
								<input type="text"
									name="domain"
									placeholder="http://yoursite.com"
									onFocus={this.focusTab}
									onBlur={this.unFocusTab}
									required
								/>
								<button className="InputWrapper__icon-button">
									<svg className="svg-icon search-icon">
										<use xlinkHref="#icon-search" />
									</svg>
								</button>
							</div>


							<ProgressLine
								className="InputGroup__progress-line"
								progress={domains.fetchProgress}
							/>
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
								<DomainsList domains={domains.data} fetchDomain={this.props.onSearch} />
							</div>
						</div>
					}
				</div>

			</div>
		);
	}
}

export default DomainSearch;
