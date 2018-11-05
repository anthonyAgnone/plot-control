import React from 'react';
import { withTimeContext } from './TimeProvider';

import '../assets/css/clock.css';

function Clock({ minutes, hours, timeOfDay }) {
	const hourFormat = () => {
		if (hours < 10) {
			return `0${hours}`;
		} else if (hours >= 13) {
			return hours - 12;
		} else {
			return hours;
		}
	};

	const minuteFormat = () => {
		if (minutes < 10) {
			return `0${minutes}`;
		} else {
			return minutes;
		}
	};

	// const formatTimeOfDay = [
	// 	'at night',
	// 	'in the morning',
	// 	'in the afternoon',
	// 	'in the evening'
	// ];

	const style = {
		minutes: {
			transform: `rotate(${270 + minutes * 6}deg)`
		},
		hours: {
			transform: `rotate(${270 + hours * 30}deg)`
		}
	};

	return (
		<div className="clock">
			<div className="clock-wrapper">
				<div className="clock-border">
					<div className="clock">
						<span className="minutes" style={style.minutes} />
						<span className="hours" style={style.hours} />
						<span className="center" />
						<p className="clock-text">
							{hourFormat()} : {minuteFormat()}
							{/* {formatTimeOfDay[timeOfDay]} */}
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}

export default withTimeContext(Clock);
