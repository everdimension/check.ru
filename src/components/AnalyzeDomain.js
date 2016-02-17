import React, { PropTypes } from 'react';

class AnalyzeDomain extends React.Component {
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
		this.props.onQuery('rnd');
	}

	render() {
		return (
			<div>
				<form onSubmit={this.handleSubmit} noValidate>
					<div className="InputGroup">
						<input name="domainQuery" type="text" placeholder="Введите полное название домена" />
					</div>
				</form>
			</div>
		);
	}

}

export default AnalyzeDomain;
