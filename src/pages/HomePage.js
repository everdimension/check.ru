import React from 'react';
import Loader from '../components/Loader';
import ClientInfoContainer from '../containers/ClientInfoContainer';

class HomePage extends React.Component {

	render() {
		return (
			<div id="home">
				<div className="row">
					<div className="small-12 columns">
						<ClientInfoContainer />

						<br/>

						<form>
							<input type="text" placeholder="Введите название домена" />
						</form>


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
