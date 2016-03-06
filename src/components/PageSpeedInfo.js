import React, { PropTypes } from 'react';
import cx from 'classnames';

class PageSpeedInfo extends React.Component {
	static get propTypes() {
		return {
			data: PropTypes.object.isRequired
		};
	}

	render() {
		console.log('rendering PageSpeedInfo');
		const { score } = this.props.data;
		return (
			<div className="PageSpeedInfo">
				<p className="PageSpeedInfo__score">
					Оценка сайта
					<br/>
					<small>
						<span
							className={cx('PageSpeedInfo__score-label', {
								'PageSpeedInfo__score-label--success': score >= 80
							})}
						>{score}</span>/100
					</small>
				</p>
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
		);
	}
}

export default PageSpeedInfo;
