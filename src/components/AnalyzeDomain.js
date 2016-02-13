import React, { PropTypes } from 'react'

class AnalyzeDomain extends React.Component {
	render () {
		return (
			<div>
				<form noValidate>
					<div className="InputGroup">
						<input name="domainQuery" type="text" placeholder="Введите полное название домена" />
					</div>
				</form>
			</div>
		)
	}
}

export default AnalyzeDomain;
