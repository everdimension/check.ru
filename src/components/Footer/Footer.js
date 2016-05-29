import React from 'react';
import './Footer.css';
import Tooltip from '../Tooltip';

class Footer extends React.Component {
	render() {
		return (
			<footer className="Footer">
				<div className="Footer__item Footer__copyright Copyright">
					<p className="text-light Copyright__line">
						&copy; {`1996–${new Date().getFullYear()}`} Check.ru
					</p>
					<p className="Copyright__line">Проект GEM</p>
				</div>

				<div className="Footer__item Footer__tracker">
					<img src="http://placehold.it/130x50" alt="" />
				</div>

				<div className="Footer__item Footer__contacts">
					<p>
						<a href="#">
							<Tooltip
								title="С 15.08.2015 обслуживание доменов производится на сайте http://dnar.ru. Логин и пароль от ваших личных кабинетов остались прежними."
								position="top"
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
