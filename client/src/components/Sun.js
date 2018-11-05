import React from 'react';

import '../assets/css/sun.css';

export default function Sun({ time: { hours, ticks } }) {
	const calcSunPos = () => {
		if (hours < 12) {
			return {
				background: `radial-gradient(circle at ${ticks * 0.0694444}% ${108 -
					ticks *
						0.138888}%, rgba(242,248,247,.7) 0%,rgba(249,249,28,.6) 1%,rgba(247,214,46,.6) 2%, rgba(248,200,95,.3) 4%,rgba(201,165,132,.2) 12%,rgba(115,130,133,.1) 51%,rgba(46,97,122,.1) 85%,rgba(24,75,106,.01) 100%)`
			};
		} else {
			return {
				background: `radial-gradient(circle at ${50 + ticks * 0.0694444}% ${ticks * 0.138888 +
					8}%, rgba(242,248,247,.7) 0%,rgba(249,249,28,.6) 1%,rgba(247,214,46,.6) 2%, rgba(248,200,95,.3) 4%,rgba(201,165,132,.2) 12%,rgba(115,130,133,.1) 51%,rgba(46,97,122,.1) 85%,rgba(24,75,106,.01) 100%)`
			};
		}
	};
	return <div className="sun" style={calcSunPos()} />;
}
