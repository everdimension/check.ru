export default function reducer(state='default_state', action) {
	switch (action.type) {
		case 'SET_STATE':
			return action.value;
	}

	return state;
}
