import React, { PropTypes } from 'react';
import Alert from '../Alert';
import DomainsList from '../DomainsList';
import ProgressLine from '../ProgressLine';
import extractDomain from '../../utils/extractDomain';
import './DomainSearch.css';

class DomainSearch extends React.Component {
	static get propTypes() {
		return {
			domains: PropTypes.object.isRequired,
			onSetDefaultTlds: PropTypes.func.isRequired,
			onSetTldsToShow: PropTypes.func.isRequired,
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
		document.getElementById('whoisTab').classList.add('focused');
	}

	unFocusTab() {
		document.getElementById('whoisTab').classList.remove('focused');
	}

	handleSubmit(eve) {
		eve.preventDefault();
		if (eve.target.checkValidity()) {
			const domainNode = eve.target.elements.domain;
			const { completeName, sld, tld } = extractDomain(domainNode.value);
			domainNode.value = completeName;
			if (tld) {
				this.props.onSetTldsToShow([tld]);
			} else {
				this.props.onSetDefaultTlds();
			}
			this.props.onSearch(sld, tld);
		}
	}

	render() {
		const { domains } = this.props;
		const domainsToShow = domains.tldsToShow.map(
			t => domains.data.find(domain => domain.tld === t)
		);
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
						<DomainsList domains={domainsToShow} fetchDomain={this.props.onSearch} />
					}
				</div>

			</div>
		);
	}
}

export default DomainSearch;
