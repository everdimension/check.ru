import React from 'react';
import './Footer.css';
import Tooltip from '../Tooltip';
import LiveInternetCounter from '../LiveInternetCounter';

class Footer extends React.Component {
	render() {
		const tooltipContent = (
			<span className="Tooltip__content">
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
					<p className="Copyright__line">
						<img
							className="Copyright__logo-img"
							src={require('../../img/gem.png')}
							alt="gem logo"
						/>
						{' '}
						<a href="http://www.gemagency.ru/" target="_blank">Проект GEM</a>
					</p>
				</div>

				<div className="Footer__item Footer__tracker">
					<a href="http://top100.rambler.ru/home?id=1992171" rel="nofollow" target="_blank">
						<img src="http://counter.rambler.ru/top100.cnt?1992171" alt="Rambler's Top100" border="0" />
					</a>
					{' '}
					<LiveInternetCounter />
				</div>

				<div className="Footer__item Footer__contacts">
					<p>
						<Tooltip
							title={tooltipContent}
							position="top"
							waitBeforeClose
						>
							<span>Ваш домен ранее обслуживался на check.ru?</span>
						</Tooltip>
					</p>
					<p>
						<img
							className="Footer__mail-icon"
							src={require('../../img/envelope.png')}
							alt=""
						/>
						{' '}
						<a href="mailto:hello@check.ru">hello@check.ru</a>
					</p>
				</div>
			</footer>
		);
	}
}

export default Footer;
