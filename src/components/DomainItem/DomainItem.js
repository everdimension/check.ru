import React, { PropTypes } from 'react';
import Loader from '../Loader';
import ShowMore from '../ShowMore';
import cx from 'classnames';
import './DomainItem.css';

class DomainItem extends React.Component {
	static get propTypes() {
		return {
			domain: PropTypes.object,
			refetch: PropTypes.func,
			className: PropTypes.string,
			expanded: PropTypes.bool
		};
	}

	constructor(props) {
		super(props);
		this.refetch = this.refetch.bind(this);
	}

	refetch(evt) {
		evt.preventDefault();
		const { tld, data: { sld } } = this.props.domain;
		this.props.refetch(sld, tld);
	}

	render() {
		const { domain, className: listClass } = this.props;
		return (
			domain.isFetching ?
				<li key={domain.tld} className={listClass}>
					{domain.data && domain.data.full_name || domain.tld}
					{' '}
					<Loader />
				</li>

			: domain.error ?
				<li key={domain.tld} className="List__item text-muted">
					<span className="circled-icon">
						<span className="cross-icon"></span>
					</span>
					{' '}
					{domain.data.full_name}
					<i>
						&mdash;&nbsp;ошибка&nbsp;ответа от сервера.
						{' '}
						<a href="#"
							onClick={this.refetch}
						>
							Попробуйте снова
						</a>
					</i>
				</li>

			: domain.fetched ?
				<li key={domain.tld} className={cx(listClass, 'DomainItem')}>
					{!domain.data.available &&
						<ShowMore
							className="DomainItem__right"
							text="Подробнее"
							target={`raw_${domain.tld}`}
							expanded={this.props.expanded}
						/>
					}

					{domain.data.available &&
						<div className="DomainItem__right text-right">
							{domain.price ?
								[
									<span>{domain.price}{'\u20BD'}</span>,
									<br />
								] : null
							}
							{domain.registerLink ?
								<a href={domain.registerLink} target="_blank">Зарегистрировать</a> :
								null
							}
						</div>
					}

					<span className={cx({ 'text-success': domain.data.available })}>
						{domain.data.full_name || domain.tld}
					</span>
					{' '}
					{domain.data.available && <span className="text-success check-icon"></span>}
					{!domain.data.available && <span className="text-danger cross-icon"></span>}
					<br />
					<small className="text-muted">
						{domain.data.available && 'домен свободен'}
						{!domain.data.available && 'домен занят'}
					</small>

					<pre id={`raw_${domain.tld}`} style={{ display: 'none' }}
						className={cx('DomainItem__more-info')}
					>
						{domain.data.details.raw}
					</pre>

				</li> : null
		);
	}
}

export default DomainItem;
