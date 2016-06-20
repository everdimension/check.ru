import React, { PropTypes } from 'react';
import ShowMore from '../ShowMore';

class HostingInfo extends React.Component {
	static get propTypes() {
		return {
			whois: PropTypes.object.isRequired
		};
	}

	render() {
		const { whois } = this.props;

		return (
			<div>
				<div className="SummaryTable">
					<div className="row SummaryTable__row">
						<div className="small-4 columns text-light text-thin SummaryTable__label">
							Регистратор
						</div>
						<div className="small-8 columns">
							{whois.regrinfo.domain.sponsor || ''}
						</div>
					</div>
					<div className="row SummaryTable__row">
						<div className="small-4 columns text-light text-thin SummaryTable__label">
							Дата регистрации
						</div>
						<div className="small-8 columns">
							{whois.regrinfo.domain.created}
						</div>
					</div>
					<div className="row SummaryTable__row">
						<div className="small-4 columns text-light text-thin SummaryTable__label">
							Статус
						</div>
						<div className="small-8 columns">
							{whois.regrinfo.domain.status.join(', ')}
						</div>
					</div>
					<div className="row SummaryTable__row">
						<div className="small-4 columns text-light text-thin SummaryTable__label">
							DNS-серверы
						</div>
						<div className="small-8 columns">
							{Object.keys(whois.regrinfo.domain.nserver).join(', ')}
						</div>
					</div>
				</div>

				<br />

				<ShowMore
					text="Вся информация WHOIS"
					target="siteWhoisRaw"
				/>
				<pre id="siteWhoisRaw">{whois.rawdata}</pre>
			</div>
		);
	}
}

export default HostingInfo;
