import React, { Component } from 'react';
import { withTimeContext } from './TimeProvider';
import Granim from 'granim';
import Sun from './Sun';
import '../assets/css/sky.css';

class Sky extends Component {
	constructor(props) {
		super(props);
		this.state = {
			granim: null
		};
	}

	componentDidMount() {
		this.setState({
			granim: new Granim({
				element: '#granim-canvas',
				name: 'granim-canvas',
				direction: 'top-bottom', // 'diagonal', 'top-bottom', 'radial'
				opacity: [1, 1],
				isPausedWhenNotInView: true,
				defaultStateName: '00',
				states: {
					'00': {
						gradients: [['#012459', '#001322']]
					},
					'01': {
						gradients: [['#012459', '#001322']]
					},
					'02': {
						gradients: [['#003972', '#001322']]
					},
					'03': {
						gradients: [['#004372', '#00182b']]
					},
					'04': {
						gradients: [['#015f90', '#2b3f4f']]
					},
					'05': {
						gradients: [['#016792', '#00182b']]
					},
					'06': {
						gradients: [['#07729f', '#042d48']]
					},
					'07': {
						gradients: [['#12a1c0', '#07506e']]
					},
					'08': {
						gradients: [['#74d4cc', '#1386a6']]
					},
					'09': {
						gradients: [['#efeebc', '#61d0cf']]
					},
					'10': {
						gradients: [['#fee154', '#a3dec6']]
					},
					'11': {
						gradients: [['#fdc352', '#e8ed92']]
					},
					'12': {
						gradients: [['#ffac6f', '#ffe467']]
					},
					'13': {
						gradients: [['#fda65a', '#ffe467']]
					},
					'14': {
						gradients: [['#fd9e58', '#ffe467']]
					},
					'15': {
						gradients: [['#f18448', '#ffd364']]
					},
					'16': {
						gradients: [['#f06b7e', '#f9a856']]
					},
					'17': {
						gradients: [['#ca5a92', '#f4896b']]
					},
					'18': {
						gradients: [['#5b2c83', '#d1628b']]
					},
					'19': {
						gradients: [['#371a79', '#713684']]
					},
					'20': {
						gradients: [['#28166b', '#45217c']]
					},
					'21': {
						gradients: [['#192861', '#372074']]
					},
					'22': {
						gradients: [['#040b3c', '#233072']]
					},
					'23': {
						gradients: [['#040b3c', '#012459']]
					}
				}
			})
		});
	}

	render() {
		const { minutes, hours, timeOfDay, ticks } = this.props;
		const watchTimeOfDay = () => {
			if (hours === 1) {
				this.state.granim.changeState('01');
			} else if (hours === 2) {
				this.state.granim.changeState('02');
			} else if (hours === 3) {
				this.state.granim.changeState('03');
			} else if (hours === 4) {
				this.state.granim.changeState('04');
			} else if (hours === 5) {
				this.state.granim.changeState('05');
			} else if (hours === 6) {
				this.state.granim.changeState('06');
			} else if (hours === 7) {
				this.state.granim.changeState('07');
			} else if (hours === 8) {
				this.state.granim.changeState('08');
			} else if (hours === 9) {
				this.state.granim.changeState('09');
			} else if (hours === 10) {
				this.state.granim.changeState('10');
			} else if (hours === 11) {
				this.state.granim.changeState('11');
			} else if (hours === 12) {
				this.state.granim.changeState('12');
			} else if (hours === 13) {
				this.state.granim.changeState('13');
			} else if (hours === 14) {
				this.state.granim.changeState('14');
			} else if (hours === 15) {
				this.state.granim.changeState('15');
			} else if (hours === 16) {
				this.state.granim.changeState('16');
			} else if (hours === 17) {
				this.state.granim.changeState('17');
			} else if (hours === 18) {
				this.state.granim.changeState('18');
			} else if (hours === 19) {
				this.state.granim.changeState('19');
			} else if (hours === 20) {
				this.state.granim.changeState('20');
			} else if (hours === 21) {
				this.state.granim.changeState('21');
			} else if (hours === 22) {
				this.state.granim.changeState('22');
			} else if (hours === 23) {
				this.state.granim.changeState('23');
			}
		};

		watchTimeOfDay();

		return (
			<div className="sky-wrap">
				<canvas id="granim-canvas" className="sky" />
				<Sun time={{ minutes, hours, timeOfDay, ticks }} />
			</div>
		);
	}
}

export default withTimeContext(Sky);
