import React, { PropTypes } from 'react';
import PageSpeedInfo from '../PageSpeedInfo';
import HostingInfo from '../HostingInfo';
import LaptopImage from '../LaptopImage';
import cx from 'classnames';
import './AnalyzeDomainResults.css';

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
					<div className="Tile large-5 columns">
						<LaptopImage
							alignOuterEdges
							size={{
								width: scrn.width > 180 ? 180 : scrn.width,
								height: scrn.width > 180 ? (scrn.height * 180 / scrn.width) : scrn.height
							}}
						>
							<a href={`data:${scrn.mime_type};base64,${scrn.data}`}
								target="_blank"
							>
								<img src={`data:${scrn.mime_type};base64,${scrn.data}`}
									alt="site preview"
								/>
							</a>
						</LaptopImage>
					</div>

					<div className="Tile large-7 columns">
						<div className="panel InfoCard InfoCard--no-overflow">
							<div className="panel__body">
								<div className="InfoCard__heading">
									<img src={http.favicon} alt="domain favicon" />
									{' '}
									{whois.regrinfo.domain.name}
								</div>


								<HostingInfo dns={dns} whois={whois} />

							</div>
						</div>

					</div>
				</div>

				<div className="row">
					<div className="Tile medium-6 columns">
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
										</ul>
									</li>

								</ul>
							</div>
						</div>
					</div>

					<div className="Tile medium-6 columns">
						<div className="panel InfoCard InfoCard--no-overflow">
							<div className="panel__body">
								<div className="InfoCard__heading">
									Веб-сервер
								</div>

								<div className="SummaryTable">
									<div className="row SummaryTable__row">
										<div className="small-7 columns text-muted text-thin SummaryTable__label">
											Код ответа:
										</div>
										<div className="small-5 columns">
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
										<div className="small-7 columns text-muted text-thin SummaryTable__label">
											Веб-сервер:
										</div>
										<div className="small-5 columns">
											{http.headers.Server}
										</div>
									</div>
									<div className="row SummaryTable__row">
										<div className="small-7 columns text-muted text-thin SummaryTable__label">
											Кодировка сайта:
										</div>
										<div className="small-5 columns">
											{http.charset}
										</div>
									</div>
									{http.headers['X-Powered-By'] ?
										<div className="row SummaryTable__row">
											<div className="small-7 columns text-muted text-thin SummaryTable__label">
												Язык программирования:
											</div>
											<div className="small-5 columns">
												{http.headers['X-Powered-By']}
											</div>
										</div> :
										null
									}
								</div>
							</div>
						</div>
					</div>
				</div>

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
