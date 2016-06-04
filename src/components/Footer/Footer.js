import React from 'react';
import './Footer.css';
import Tooltip from '../Tooltip';
import LiveInternetCounter from '../LiveInternetCounter';

class Footer extends React.Component {
	render() {
		const tooltipContent = (
			<span>
				С 15.08.2015 обслуживание доменов производится на сайте
				{' '}
				<a href="http://dnar.ru" target="_blank">http://dnar.ru</a>.
				{' '}
				Логин и пароль от ваших личных кабинетов остались прежними.
			</span>
		);

		return (
			<footer className="Footer">
				<div className="Footer__item Footer__copyright Copyright">
					<p className="text-light Copyright__line">
						&copy; {`1996–${new Date().getFullYear()}`} Check.ru
					</p>
					<p className="Copyright__line">Проект GEM</p>
				</div>

				<div className="Footer__item Footer__tracker">
					<a href="http://top100.rambler.ru/navi/3074083/" rel="nofollow" target="_blank">
						<img src="http://counter.rambler.ru/top100.cnt?3074083" alt="Rambler's Top100" border="0" />
					</a>
					{' '}
					<LiveInternetCounter />
				</div>

				<div className="Footer__item Footer__contacts">
					<p>
						<a href="#">
							<Tooltip
								title={tooltipContent}
								position="top"
								waitBeforeClose
							>
								<span>Ваш домен ранее обслуживался на check.ru?</span>
							</Tooltip>

						</a>
					</p>
					<p>
						<a href="maito:hello@check.ru">hello@check.ru</a>
					</p>
				</div>
			</footer>
		);
	}
}

export default Footer;
