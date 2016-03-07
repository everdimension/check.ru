import React, { PropTypes } from 'react';

class AnalyzeDomainSearch extends React.Component {
	static get propTypes() {
		return {
			onQuery: PropTypes.func.isRequired
		};
	}

	constructor(props) {
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit(evt) {
		evt.preventDefault();
		if (evt.target.checkValidity()) {
			console.log('is valid form');
			this.props.onQuery(evt.target.elements.domainQuery.value);
		}
	}

	render() {
		return (
			<div>
				<form onSubmit={this.handleSubmit} noValidate>
					<div className="InputGroup">
						<input name="domainQuery"
							type="text"
							placeholder="Введите полное название домена"
							required
						/>
					</div>
				</form>
			</div>
		);
	}

}

export default AnalyzeDomainSearch;
