import React, { PropTypes } from 'react';
import ClientInfoContainer from '../containers/ClientInfoContainer';
import AdContainer from '../components/AdContainer';
import GoogleAd from '../components/GoogleAd';
import StickyFooter from '../components/StickyFooter';
import { Link, IndexLink } from 'react-router';

const adClientKey = __AD_CLIENT_KEY__; // eslint-disable-line no-undef
const adSlotNumber = __AD_SLOT_NUMBER__; // eslint-disable-line no-undef

class HomePage extends React.Component {

	static get propTypes() {
		return {
			children: PropTypes.element
		};
	}

	render() {
		return (
			<div id="home">

				<aside className="AsideContent">
					<AdContainer>
						<GoogleAd
							adClientKey={adClientKey}
							adSlotNumber={adSlotNumber}
							width="160px"
							height="600px"
						/>
					</AdContainer>
				</aside>

				<main className="MainContent container">
					<div className="row" id="copyrightFooterWrapper">
						<div className="medium-12 columns" id="copyrightFooterContent">

							<ClientInfoContainer />

							<nav id="domainsNav">
								<ul className="DomainsNav">
									<li className="DomainsNav__item">
										<IndexLink to="/"
											id="whoisTab"
											activeClassName="active"
										>Whois</IndexLink>
									</li>
									<li className="DomainsNav__item">
										<Link to="/analytics"
											activeClassName="active"
											id="analyticsTab"
										>Анализ сайта</Link>
									</li>
								</ul>
							</nav>

							{this.props.children}

							<StickyFooter wrapperId="copyrightFooterWrapper" contentId="copyrightFooterContent">
								<div className="panel">
									<div className="panel__body">
										Enter LTD &mdash; старейший регистратор доменных имён в
										Lorem ipsum dolor sit amet, consectetur adipisicing elit.
										Nostrum sed, recusandae veritatis mollitia eos
										exercitationem corrupti doloremque qui unde alias?
									</div>
								</div>
							</StickyFooter>
						</div>

					</div>
				</main>

				{/* <div className="row">
					<div className="small-12 column">
						<div className="row">
							<div className="small-12 column">
								<p>page content inside a <code>.row</code></p>
							</div>
						</div>
						<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias, distinctio!</p>

						<div className="panel">
							<div className="panel__body">
								mega panel
							</div>
						</div>
					</div>
				</div> */}

			</div>
		);
	}


}

export default HomePage;
