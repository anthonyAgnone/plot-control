import React from 'react';

import bed from '../assets/bed.png';
import fridge from '../assets/fridge.png';
import couch from '../assets/couch.png';

export default function SubPiece({ type, createdTick }) {
	const handleImage = () => {
		if (type === 'fridge') return fridge;
		else if (type === 'bed') return bed;
		else if (type === 'couch') return couch;
	};
	const style = {
		bed: {
			width: '100%',
			height: '100%',
			display: 'flex',
			pointerEvents: 'none',
			transform: 'scale(.5) translateX(-10%) translateY(-40%)'
		},
		fridge: {
			pointerEvents: 'none',
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center',
			width: '100%',
			height: '100%',
			transform: `rotateX(0deg) rotateY(0deg) rotateZ(45deg) scaleX(.6) scaleY(.9) translate(-35%, -69%)`
		},
		couch: {
			pointerEvents: 'none',
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center',
			width: '100%',
			height: '100%',
			transform: `rotateX(10deg) rotateY(0deg) rotateZ(45deg) scaleX(1) scaleY(1) translate(-1%, -29%)`
		}
	};
	return (
		<div style={style.container}>
			<img src={handleImage()} style={style[type]} alt="" />
		</div>
	);
}
