import React, { PropTypes } from 'react';
import { fetchIpInfo } from '../redux/modules/ipInfo';
import ClientInfo from '../components/ClientInfo';

class ClientInfoContainer extends React.Component {

	static get contextTypes() {
		return {
			store: PropTypes.object
		};
	}

	constructor(props, context) {
		super(props, context);
		this.store = context.store;
		this.state = this.store.getState();
	}

	componentWillMount() {
		this.listener = this.store.subscribe(() => {
			this.setState(this.store.getState());
		});

		this.store.dispatch(fetchIpInfo());
	}

	componentWillUnmount() {
		this.listener();
	}

	render() {
		return (
			<ClientInfo
				data={this.state.ipInfo.get('data')}
				loading={this.state.ipInfo.get('isFetching')}
			/>
		);
	}
}

export default ClientInfoContainer;
