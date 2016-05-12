import React, { PropTypes as t } from 'react';
import './RuleDetails.css';

function getFormattedText({ args = [], format }) {
	return args.reduce((str, arg, index) => {
		if (arg.type === 'HYPERLINK') {
			return `<a href="${arg.value}" target="_blank">${str}</a>`;
		}
		if (arg.type === 'URL') {
			return str.replace(
				`$${index + 1}`, `<a href="${arg.value}" target="_blank">${arg.value}</a>`
			);
		}
		return str.replace(`$${index + 1}`, arg.value);
	}, format);
}

const textBlockShape = t.shape({
	args: t.arrayOf(t.shape({
		type: t.string.isRequired,
		value: t.string.isRequired
	})),
	format: t.string.isRequired
});

class RuleDetails extends React.Component {
	static get propTypes() {
		return {
			name: t.string,
			data: t.shape({
				urlBlocks: t.arrayOf(t.shape({
					header: textBlockShape,
					urls: t.arrayOf(t.shape({
						result: textBlockShape.isRequired
					}))
				}))
			}).isRequired
		};
	}

	render() {
		const { urlBlocks } = this.props.data;
		return (
			<div>
				{urlBlocks.map((block, index) => (
					<div key={index} className="RuleDetail">
						<div dangerouslySetInnerHTML={{ __html: getFormattedText(block.header) }} />
						{!!block.urls &&
							<ul className="RuleDetail__list">
								{block.urls.map((url, ind) => (
									<li key={ind}
										dangerouslySetInnerHTML={{ __html: getFormattedText(url.result) }}
									/>
								))}
							</ul>
						}
					</div>
				))}
			</div>
		);
	}
}

export default RuleDetails;
