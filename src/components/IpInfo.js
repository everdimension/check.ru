import React, { PropTypes } from 'react'
import Loader from './Loader';

class IpInfo extends React.Component {
	static get propTypes () {
		return {
			data: PropTypes.object,
			loading: PropTypes.bool
		};
	}
	render () {
		return (
			<div className="panel">
				<div className="panel__body SummaryTable">
					{this.props.loading ? <div className="text-center"><Loader size="large" /></div> : null}

					{this.props.data ?
					<div className="SummaryTable">
						<div className="row SummaryTable__row">
							<div className="medium-3 columns SummaryTable__label text-light text-thin">
								<span>
									Your IP address
								</span>

							</div>
							<div className="medium-9 columns">
								<span className="SummaryTable__value SummaryTable__value--huge">
									95.30.43.126
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
								95.30.43.126.broadband.corbina.ru
							</div>
						</div>

						<div className="row SummaryTable__row">
							<div className="medium-3 columns SummaryTable__label text-light text-thin">
								<span>
									Operating system
								</span>

							</div>
							<div className="medium-9 columns">
								<span>Microsoft Windows 10.0</span>
							</div>
						</div>

						<div className="row SummaryTable__row">
							<div className="medium-3 columns SummaryTable__label text-light text-thin">
								<span>
									Your browser
								</span>

							</div>
							<div className="medium-9 columns">
								<span>Chrome 46.0.2490.80</span>
							</div>
						</div>

						<div className="row SummaryTable__row">
							<div className="medium-3 columns SummaryTable__label text-light text-thin">
								<span>
									Your location
								</span>

							</div>
							<div className="medium-9 columns">
								<span>Russian federation, Krasnodar</span>
							</div>
						</div>
					</div>
					: null}

				</div>

			</div>
		);
	}
}

export default IpInfo;
