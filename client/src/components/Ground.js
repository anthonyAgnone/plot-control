import React, { Component } from 'react';
import { withGameContext } from './GameProvider';
import { withTimeContext } from './TimeProvider';
import { withRouter } from 'react-router-dom';
import { TweenLite } from 'gsap/all';

import Room from './Room';
import Grid from './Grid';

import bg from '../assets/grass3.png';
import '../assets/css/ground.css';

class Ground extends Component {
	constructor() {
		super();

		this.myElement = null;
		this.myTween = null;
		this.animation = this.animation.bind(this);
		this.handleLogout = this.handleLogout.bind(this);
	}

	handleLogout() {
		this.props.handleLogout();
		setTimeout(() => {
			this.props.history.push({ pathname: '/' });
		}, 1500);
	}
	animation() {
		this.myTween = TweenLite.to(this.myElement, 1, {
			css: {
				transform: 'translateX(-100%) rotateX(0deg) rotateY(0deg) rotateZ(0deg) scale(0.6)',
				opacity: 0.5
			},
			onComplete: this.handleLogout
		});
	}

	genGrid = n => {
		const grid = [];
		for (let i = 0; i < n * n; i++) {
			const squareX = i % n;
			const squareY = Math.floor(i / n);
			const piece = this.props.pieces.reduce((acc, p) => {
				if (squareX === p.position[0] && squareY === p.position[1]) {
					return (
						<Room
							handleIsEditing={this.props.handleIsEditing(p._id, p._type)}
							wall={p.wall}
							material={p.material}
							_id={p._id}
							type={p.type}
							child={this.props.subPieces.find(subPiece => subPiece.piece === p._id)}
						/>
					);
				} else {
					return acc;
				}
			}, null);

			grid.push(
				<Grid x={squareX} y={squareY} key={i}>
					{piece}
				</Grid>
			);
		}
		return grid;
	};
	render() {
		const groundColors = ['#1f2b0e', '#8ec63f', '#edc672', '#783938'];
		const style = {
			ground: {
				backgroundColor: groundColors[this.props.timeOfDay],
				backgroundImage: `url(${bg})`
			}
		};
		return (
			<div>
				<button className="logout-button" onClick={() => this.animation()}>
					<span>LogOut</span>
				</button>
				<div
					ref={div => (this.myElement = div)}
					style={style.ground}
					className="ground-wrapper"
				>
					{this.genGrid(this.props.n)}
				</div>
			</div>
		);
	}
}

// export default withRouter(withTimeContext(withGameContext()()(Ground)));
export default withRouter(
	withTimeContext(
		withGameContext(({ subPieces, handleIsEditing, pieces, handleLogout }) => ({
			subPieces,
			handleIsEditing,
			pieces,
			handleLogout
		}))(Ground)
	)
);
