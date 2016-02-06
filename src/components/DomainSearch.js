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

	componentDidUpdate(prevProps, prevState) {
		const { fetchProgress: currentProgress } = this.props.domains;
		const { fetchProgress: prevProgress } = prevProps.domains;
		const completed = currentProgress === 100;
		console.log(currentProgress, prevProgress, completed);

		if (completed && currentProgress !== prevProgress) {
			setTimeout(() => {
				console.log('settint state showProgress to false');
				this.setState({
					showProgress: false
				});
			}, 600);
		} else if (!this.state.showProgress && this.props.domains.isFetching) {
			this.setState({
				showProgress: true
			});
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
							<ProgressLine className="InputGroup__progress-line"
								progress={!showProgress ? 0 : domains.fetchProgress}
								reset={!showProgress}
							/>
						</div>
					</form>
				</div>
				<p>
					{domains.fetchProgres}%
				</p>

				<div className="DomainSearch__results">
					{ domains.error &&
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
							<DomainsList domains={domains.data} />
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
