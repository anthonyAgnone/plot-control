import React, { Component, createContext } from 'react';
import { subscribeToTimer } from '../api';

const { Consumer, Provider } = createContext();

export default class TimeProvider extends Component {
	constructor(props) {
		super(props);

		this.state = {
			plantWillGrow: false,
			minutes: 0,
			hours: 0,
			timeOfDay: 0,
			granim: null
		};
	}

	resetBool() {
		if (this.state.plantWillGrow === true) {
			this.setState({
				plantWillGrow: false
			});
		}
	}
	componentDidMount() {
		subscribeToTimer((err, timestamp) => {
			this.setState({
				minutes: timestamp.minutes,
				hours: timestamp.hours,
				timeOfDay: timestamp.timeOfDay,
				ticks: timestamp.ticks,
				totalTicks: timestamp.totalTicks
			});
		});
	}

	render() {
		const value = {
			...this.state
		};
		return <Provider value={value}>{this.props.children}</Provider>;
	}
}
export const withTimeContext = C => props => (
	<Consumer>{value => <C {...value} {...props} />}</Consumer>
);
