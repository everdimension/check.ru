import React, { PropTypes } from 'react';
import cx from 'classnames';
import Collapse from '../Collapse';
import RuleDetails from './RuleDetails';

class PageSpeedInfo extends React.Component {
	static get propTypes() {
		return {
			data: PropTypes.object.isRequired
		};
	}

	render() {
		console.log('rendering PageSpeedInfo');
		const { score, formattedResults } = this.props.data;

		const rules = [];
		const { ruleResults } = formattedResults;
		for (const rule in ruleResults) {
			if (ruleResults.hasOwnProperty(rule)) {
				rules.push(
					<li key={rule}>
						<span
							className={cx('List__icon', {
								'check-icon text-success': !ruleResults[rule].ruleImpact,
								'cross-icon text-danger': ruleResults[rule].ruleImpact
							})}
						/>

						{ruleResults[rule].ruleImpact ?
							<Collapse>
								<a href="#" className="ui-link">{ruleResults[rule].localizedRuleName}</a>
								<RuleDetails name={rule} data={ruleResults[rule]} />
								<p>Lorem ipspansum dolor sit amet.</p>
							</Collapse> :
							<span>{ruleResults[rule].localizedRuleName}</span>
						}
					</li>
				);
			}
		}

		return (
			<div className="PageSpeedInfo">
				<p className="PageSpeedInfo__score">
					Оценка сайта
					<br />
					<small>
						<span
							className={cx('PageSpeedInfo__score-label', {
								'PageSpeedInfo__score-label--success': score >= 80
							})}
						>{score}</span>/100
					</small>
				</p>
				<ul className="List List--icons">
					{rules}
				</ul>
			</div>
		);
	}
}

export default PageSpeedInfo;
