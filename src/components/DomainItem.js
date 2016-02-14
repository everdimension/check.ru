import React, { PropTypes } from 'react'
import Loader from './Loader';
import cx from 'classnames';
import './DomainItem.css';

class DomainItem extends React.Component {
	static get propTypes() {
		return {
			domain: PropTypes.object,
			refetch: PropTypes.func
		};
	}

	constructor(props) {
		super(props);
		this.state = {
			expanded: false
		};
		this.refetch = this.refetch.bind(this);
		this.toggleMore = this.toggleMore.bind(this);
	}

	refetch(evt) {
		evt.preventDefault();
		const { tld, data: { sld } } = this.props.domain;
		this.props.refetch(sld, tld);
	}

	toggleMore(evt) {
		evt.preventDefault();
		this.setState({
			expanded: !this.state.expanded
		});
	}

	render () {
		const { domain, className: listClass } = this.props;
		const { expanded } = this.state;
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
						onClick={this.refetch}>
						Попробуйте снова
					</a>
				</i>
			</li>

			:
			<li key={domain.tld} className={cx(listClass, 'DomainItem')}>
				{!domain.data.available &&
					<a href="#" onClick={this.toggleMore} className="DomainItem__right">
						Подробнее <span className={cx('chevron-icon', { 'chevron-icon--down': expanded})}></span>
					</a>
				}

				{domain.data.available &&
					<div className="DomainItem__right text-right">
						<span>{domain.price}{'\u20BD'}</span>
						<br/>
						<a href="http://dnar.ru" target="_blank">Зарегистрировать</a>
					</div>
				}

				<span className={cx({'text-success': domain.data.available})}>{domain.data.full_name || domain.tld}</span>
				{' '}
				{domain.data.available && <span className="text-success check-icon"></span>}
				{!domain.data.available && <span className="text-danger cross-icon"></span>}
				<br/>
				<small className="text-muted">
					{domain.data.available && 'домен свободен'}
					{!domain.data.available && 'домен занят'}
				</small>

				<pre style={{ display: expanded ? 'block' : 'none' }}
					className={cx('DomainItem__more-info', { expanded })}
				>
					{domain.data.details.raw}
				</pre>

			</li>
		);
	}
}

export default DomainItem;
