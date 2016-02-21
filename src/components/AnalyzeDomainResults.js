import React, { PropTypes } from 'react';

class AnalyzeDomainResults extends React.Component {
	render() {
		return (
			<div>
				<div className="row">
					<div className="small-4 columns">
						<div className="thumb">
							<img src="http://unsplash.it/200/220"
								alt="site preview"
							/>
						</div>
					</div>

					<div className="small-8 columns">
						<div className="panel InfoCard">
							<div className="panel__body">
								<div className="InfoCard__heading">
									IMDB.COM
								</div>


								<div className="SummaryTable">
									<div className="row SummaryTable__row">
										<div className="small-4 columns text-light text-thin SummaryTable__label">
											Регистратор
										</div>
										<div className="small-8 columns">
											GoDaddy.com, LLC R41-ME (146)
										</div>
									</div>
									<div className="row SummaryTable__row">
										<div className="small-4 columns text-light text-thin SummaryTable__label">
											Дата регистрации
										</div>
										<div className="small-8 columns">
											2008-04-29
										</div>
									</div>
									<div className="row SummaryTable__row">
										<div className="small-4 columns text-light text-thin SummaryTable__label">
											Статус
										</div>
										<div className="small-8 columns">
											CLIENT DELETE PROHIBITED,CLIENT RENEW PROHIBITED,CLIENT TRANSFER PROHIBITED,CLIENT UPDATE PROHIBITED
										</div>
									</div>
									<div className="row SummaryTable__row">
										<div className="small-4 columns text-light text-thin SummaryTable__label">
											DNS-серверы
										</div>
										<div className="small-8 columns">
											ns1.linode.com ns2.linode.com ns3.linode.com ns4.linode.com ns5.linode.com
										</div>
									</div>
								</div>

								<br/>
								<a href="#">Вся информация WHOIS</a>
							</div>
						</div>

					</div>
				</div>

				<br/>

				<div className="row">
					<div className="small-6 columns">
						<div className="panel">
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
											<li>
												5.9.63.34
											</li>
										</ul>
									</li>

									<li>
										<span className="List__icon check-icon text-success"></span>
										{' '}
										MX-запись
										<ul>
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
						<div className="panel">
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
											200
											{' '}
											<span className="icon-check text-success"></span>
										</div>
									</div>
									<div className="row SummaryTable__row">
										<div className="small-5 columns text-muted text-thin SummaryTable__label">
											Веб-сервер:
										</div>
										<div className="small-7 columns">
											nginx/1.6.2
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				<br/>

				<div className="panel">
					<div className="panel__body">
						<div className="InfoCard__heading">
							Советы по оптимизации
						</div>

						<ul className="List List--icons">
							<li>
								<span className="List__icon check-icon text-success"></span>
								Не используйте переадресацию с целевой страницы
							</li>
							<li>
								<span className="List__icon cross-icon text-danger"></span>
								Включите сжатие
							</li>
						</ul>
					</div>
				</div>
			</div>
		);
	}
}

export default AnalyzeDomainResults;
