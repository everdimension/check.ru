import React, { PropTypes } from 'react';
import PageSpeedInfo from '../PageSpeedInfo';
import HostingInfo from '../HostingInfo';
import cx from 'classnames';

class AnalyzeDomainResults extends React.Component {

	static get propTypes() {
		return {
			dns: PropTypes.object.isRequired,
			http: PropTypes.object.isRequired,
			pagespeed: PropTypes.object.isRequired,
			whois: PropTypes.object.isRequired
		};
	}

	render() {
		console.log('rendeting analyze results');
		const { dns, http, whois, pagespeed } = this.props;
		const scrn = pagespeed.screenshot;

		const resSuccess = http.status >= 200 && http.status < 300;

		return (
			<div>
				<div className="row">
					<div className="small-4 columns">
						<div className="thumb">
							<img src={`data:${scrn.mime_type};base64,${scrn.data}`}
								alt="site preview"
							/>
						</div>
					</div>

					<div className="small-8 columns">
						<div className="panel InfoCard InfoCard--no-overflow">
							<div className="panel__body">
								<div className="InfoCard__heading">
									<img src={http.favicon} alt="domain favicon" />
									{whois.regrinfo.domain.name}
								</div>


								<HostingInfo dns={dns} whois={whois} />

							</div>
						</div>

					</div>
				</div>

				<br />

				<div className="row">
					<div className="small-6 columns">
						<div className="panel InfoCard InfoCard--no-overflow">
							<div className="panel__body">
								<div className="InfoCard__heading">
									ДИАГНОСТИКА
								</div>

								<ul className="List List--icons">
									<li>
										<span className="List__icon check-icon text-success"></span>
										{' '}
										Информация из DNS получена
									</li>

									<li>
										<span className="List__icon check-icon text-success"></span>
										{' '}
										A-запись
										<ul>
											{dns.A.map(item => (
												<li key={item.ip}>
													{item.ip}
												</li>
											))}
										</ul>
									</li>

									<li>
										<span className="List__icon check-icon text-success"></span>
										{' '}
										MX-запись
										<ul>
											{dns.MX.map((item, i) => (
												<li key={i}>
													{item.target}
												</li>
											))}
											<li>ASPMX2.GOOGLEMAIL.COM</li>
											<li>ASPMX3.GOOGLEMAIL.COM</li>
											<li>ASPMX.L.GOOGLE.COM</li>
											<li>ALT1.ASPMX.L.GOOGLE.COM</li>
											<li>ALT2.ASPMX.L.GOOGLE.COM</li>
										</ul>
									</li>

								</ul>
							</div>
						</div>
					</div>

					<div className="small-6 columns">
						<div className="panel InfoCard InfoCard--no-overflow">
							<div className="panel__body">
								<div className="InfoCard__heading">
									Веб-сервер
								</div>

								<div className="SummaryTable">
									<div className="row SummaryTable__row">
										<div className="small-5 columns text-muted text-thin SummaryTable__label">
											Код ответа:
										</div>
										<div className="small-7 columns">
											{http.status}
											{' '}
											<span
												className={cx({
													'check-icon text-success': resSuccess,
													'cross-icon text-danger': !resSuccess
												})}
											/>
										</div>
									</div>
									<div className="row SummaryTable__row">
										<div className="small-5 columns text-muted text-thin SummaryTable__label">
											Веб-сервер:
										</div>
										<div className="small-7 columns">
											{http.headers.Server}
										</div>
									</div>
									<div className="row SummaryTable__row">
										<div className="small-5 columns text-muted text-thin SummaryTable__label">
											Кодировка сайта:
										</div>
										<div className="small-7 columns">
											{http.charset}
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				<br />

				<div className="panel InfoCard InfoCard--no-overflow">
					<div className="panel__body">
						<div className="InfoCard__heading">
							Советы по оптимизации
						</div>

						<PageSpeedInfo data={pagespeed} />
					</div>
				</div>
			</div>
		);
	}
}

export default AnalyzeDomainResults;
