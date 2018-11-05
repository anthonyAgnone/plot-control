import React, { Component } from 'react';
import { withGameContext } from './GameProvider';
import { withTimeContext } from './TimeProvider';
import HamburgerMenu from 'react-hamburger-menu';

import '../assets/css/createForm.css';

class PieceManip extends Component {
	constructor() {
		super();

		this.state = {
			type: '',
			material: null,
			walls: null,
			open: false,
			step: 0
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleOpen = this.handleOpen.bind(this);
	}

	handleChange(event) {
		const target = event.target;
		const value = target.value;
		const name = target.name;

		if (name === 'material') {
			this.setState(prevState => ({
				step: 1
			}));
		}

		this.setState({
			[name]: value
		});
	}

	handleOpen() {
		this.setState({
			open: !this.state.open
		});
	}

	render() {
		const style = {
			manipWrapper: {
				right: this.state.open ? '0' : '-20vw'
			}
		};
		const handleMaterialForm = () => {
			if (this.state.type === 'room' || this.state.type === 'gravel') {
				return (
					<select name="material" value={this.state.material} onChange={this.handleChange}>
						<option value="">Choose Material</option>
						<option value="wood">Wood : $5</option>
						<option value="tile">Tile : $5</option>
						<option value="planks">Planks : $4</option>
						<option value="plywood">Plywood : $3</option>
						<option value="decBrick">Decorative Brick : $10</option>
						<option value="gravel">Gravel : $1</option>
					</select>
				);
			} else return null;
		};

		const handleWallForm = () => {
			if (!this.state.material) {
				return null;
			} else {
				return (
					<select name="walls" value={this.state.wall} onChange={this.handleChange}>
						<option value="">Choose Wall</option>
						<option value="">None</option>
						<option value="east">East : $2</option>
						<option value="south">South : $2</option>
						<option value="west">West : $2</option>
						<option value="north">North : $2</option>
						<option value="northWest">North West : $2</option>
						<option value="northEast">North East : $2</option>
						<option value="southWest">South West : $2</option>
						<option value="southEast">South East : $2</option>
						<option value="northSouthEast">North South East : $2</option>
						<option value="northSouthWest">North South West : $2</option>
						<option value="southEastWest">South East West : $2</option>
						<option value="northEastWest">North East West : $2</option>
						<option value="northSouth">North South : $2</option>
						<option value="eastWest">East West : $2</option>
					</select>
				);
			}
		};

		const pieceCost = () => {
			const { type, material, walls } = this.state;
			let piece = 0;
			let materialCost = 0;
			let wallsCost = 0;

			if (type === 'room') piece += 20;
			else if (type === 'garden') piece += 60;
			else piece += 10;

			if (material === 'wood') materialCost += 5;
			else if (material === 'tile') materialCost += 5;
			else if (material === 'planks') materialCost += 4;
			else if (material === 'plywood') materialCost += 3;
			else if (material === 'decBrick') materialCost += 10;
			else if (material === 'gravel') materialCost += 1;
			else materialCost += 0;

			if (walls) wallsCost += 2;

			console.log(piece, materialCost, wallsCost, piece + materialCost + wallsCost);

			return piece + materialCost + wallsCost;
		};
		return (
			<div className="form-wrapper" style={style.manipWrapper}>
				<HamburgerMenu
					isOpen={this.state.open}
					menuClicked={this.handleOpen}
					width={30}
					height={30}
					strokeWidth={3}
					animationDuration={0.5}
				/>
				<div className="form-wrap">
					<h2>Create Piece</h2>
					<form>
						<select name="type" value={this.state.type} onChange={this.handleChange}>
							<option value="null">Type of Piece</option>
							<option value="room">Room : $20</option>
							<option value="garden">Garden : $60</option>
							<option value="gravel">Walkway : $10</option>
						</select>
						{handleMaterialForm()}
						{handleWallForm()}
					</form>
					<button
						className="button"
						onClick={() => {
							if (this.props.money > pieceCost()) {
								this.props.handleBuyRoom(pieceCost());
								this.props.handleAddPiece(
									this.state.type,
									this.state.material,
									this.state.walls,
									this.props.totalTicks
								);
							}
						}}
					>
						<span>Make Room</span>
					</button>
				</div>
			</div>
		);
	}
}

// export default withGameContext()()(PieceManip);
export default withTimeContext(
	withGameContext(({ handleAddPiece, handleBuyRoom, money }) => ({
		handleAddPiece,
		handleBuyRoom,
		money
	}))(PieceManip)
);
