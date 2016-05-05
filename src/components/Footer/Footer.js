import React from 'react';
import './Footer.css';

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
							Ваш домен ранее обслуживался на check.ru?
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
