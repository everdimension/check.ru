import React, { PropTypes } from 'react';
import Loader from './Loader';

class ClientInfo extends React.Component {

	static get propTypes() {
		return {
			data: PropTypes.object,
			fetching: PropTypes.bool
		};
	}

	render() {
		const { data } = this.props;
		return (
			<div className="panel panel--transparent">
				<div className="panel__body SummaryTable">
					{this.props.fetching ? <div className="text-center"><Loader size="large" /></div> : null}

					{this.props.data ?
					<div className="SummaryTable SummaryTable--padded">
						<div className="row SummaryTable__row">
							<div className="medium-3 columns SummaryTable__label text-light text-thin">
								<span>
									Your IP address
								</span>

							</div>
							<div className="medium-9 columns">
								<span className="SummaryTable__value SummaryTable__value--huge">
									{data.ip}
								</span>

							</div>
						</div>

						<div className="row SummaryTable__row">
							<div className="medium-3 columns SummaryTable__label text-light text-thin">
								<span>
									Computer name
								</span>

							</div>
							<div className="medium-9 columns">
								{data.client_machine_name}
							</div>
						</div>

						<div className="row SummaryTable__row">
							<div className="medium-3 columns SummaryTable__label text-light text-thin">
								<span>
									Operating system
								</span>

							</div>
							<div className="medium-9 columns">
								{[data.os, data.os_version].join(' ')}
							</div>
						</div>

						<div className="row SummaryTable__row">
							<div className="medium-3 columns SummaryTable__label text-light text-thin">
								<span>
									Your browser
								</span>

							</div>
							<div className="medium-9 columns">
								<span>{[data.browser, data.browser_version].join(' ')}</span>
							</div>
						</div>

						<div className="row SummaryTable__row">
							<div className="medium-3 columns SummaryTable__label text-light text-thin">
								<span>
									Your location
								</span>

							</div>
							<div className="medium-9 columns">
								{[data.city, data.country].join(', ')}

								{ data.lat && <br /> }
								{ data.lat && [data.lat, data.lng].join(', ') }
							</div>
						</div>
					</div>
					: null}

				</div>

			</div>
		);
	}
}

export default ClientInfo;
