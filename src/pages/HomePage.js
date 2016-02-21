import React, { PropTypes } from 'react';
import ClientInfoContainer from '../containers/ClientInfoContainer';
import { Link, IndexLink } from 'react-router';

class HomePage extends React.Component {

	static get propTypes() {
		return {
			children: PropTypes.element
		};
	}

	render() {
		return (
			<div id="home">
				<div className="row">
					<div className="small-12 columns">
						<ClientInfoContainer />

						<br/>

						<nav id="domainsNav">
							<ul className="DomainsNav">
								<li className="DomainsNav__item">
									<IndexLink to="/" activeClassName="active">Whois</IndexLink>
								</li>
								<li className="DomainsNav__item">
									<Link to="/analytics" activeClassName="active">Анализ сайта</Link>
								</li>
							</ul>
						</nav>

						{this.props.children}
					</div>

				</div>

				<div className="row">
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
				</div>

			</div>
		);
	}


}

export default HomePage;
