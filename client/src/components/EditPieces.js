import React, { Component } from 'react';
import { withGameContext } from './GameProvider';
import { withPiece } from './GetPiece';

import '../assets/css/editPiece.css';

class EditPieces extends Component {
	constructor(props) {
		super(props);
		const { material, type, wall, _id } = props;
		this.state = {
			_id,
			material: material || '',
			type: type || '',
			wall: wall || '',
			subPiece: null
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleViewFurniture = this.handleViewFurniture.bind(this);
		this.handleGetSubPrice = this.handleGetSubPrice.bind(this);
	}

	static getDerivedStateFromProps({ wall, material, _id }, prevState) {
		if (prevState._id !== _id)
			return {
				...prevState,
				wall,
				material,
				_id
			};
		else return prevState;
	}

	handleChange(event) {
		const target = event.target;
		const value = target.value;
		const name = target.name;
		this.setState({
			[name]: value
		});
		this.handleGetPrice = this.handleGetPrice.bind(this);
	}

	materialSelect() {
		return (
			<select name="material" value={this.state.material} onChange={this.handleChange}>
				<option value="">Choose Material</option>
				<option value="wood">Wood</option>
				<option value="tile">Tile</option>
				<option value="planks">Planks</option>
				<option value="plywood">Plywood</option>
				<option value="decBrick">Decorative Brick</option>
			</select>
		);
	}

	wallSelect() {
		return (
			<select name="wall" value={this.state.wall} onChange={this.handleChange}>
				<option value="">Choose Wall</option>
				<option value="">None</option>
				<option value="east">East</option>
				<option value="south">South</option>
				<option value="west">West</option>
				<option value="north">North</option>
				<option value="northWest">North West</option>
				<option value="northEast">North East</option>
				<option value="southWest">South West</option>
				<option value="southEast">South East</option>
				<option value="northSouthEast">North South East</option>
				<option value="northSouthWest">North South West</option>
				<option value="southEastWest">South East West</option>
				<option value="northEastWest">North East West</option>
				<option value="northSouth">North South</option>
				<option value="eastWest">East West</option>
			</select>
		);
	}

	handleGetPrice() {
		const hasSubPiece = this.props.subPieces.find(el => el.piece === this.state._id);
		if (hasSubPiece) {
			const isMature = this.props.gardenMature.find(el => el === hasSubPiece._id);
			if (isMature) return 100;
			else return 20;
		} else return 5;
	}

	handleViewFurniture() {
		return (
			<select name="subPiece" value={this.state.subPiece} onChange={this.handleChange}>
				<option value="">Add nothing</option>
				{this.state.material === 'tile' ? null : <option value="bed">Add Bed : $15</option>}
				{this.state.material === 'tile' ? null : (
					<option value="couch">Add Couch: $15</option>
				)}
				{this.state.material === 'tile' ? (
					<option value="fridge">Add Refrigerator : $45</option>
				) : null}
			</select>
		);
	}

	handleGetSubPrice() {
		const { subPiece } = this.state;
		if (subPiece === 'bed') return 15;
		else if (subPiece === 'couch') return 15;
		else if (subPiece === 'fridge') return 45;
		else return 0;
	}

	render() {
		const style = {
			editWrapper: {
				left: this.props._id ? '0' : '-25vw'
			}
		};
		return (
			<div className="edit-pieces" style={style.editWrapper}>
				<button className="close-button" onClick={this.props.handleIsEditing(null)}>
					X
				</button>
				<div className="form-wrap">
					<form>
						<h1>{this.props.type}</h1>
						{this.props.type === 'room' ? this.materialSelect() : null}
						{this.props.type === 'room' || this.props.type === 'gravel'
							? this.wallSelect()
							: null}
						{this.props.type === 'room' ? this.handleViewFurniture() : null}
					</form>
				</div>
				<div className="buttons">
					{this.props.type === 'garden' ? null : (
						<button
							onClick={() =>
								this.props.handleEditPiece(
									this.state._id,
									this.state.material,
									this.state.wall,
									this.state.subPiece,
									this.props.plot,
									this.handleGetSubPrice()
								)
							}
							className="edit-button"
						>
							<span>Edit Piece</span>
						</button>
					)}

					<button
						onClick={() =>
							this.props.handleDeletePiece(this.state._id, this.handleGetPrice())
						}
						className="delete-button"
					>
						<span>Sell Piece</span>
					</button>
				</div>
			</div>
		);
	}
}

export default withGameContext(
	({
		handleIsEditing,
		handleEditPiece,
		handleDeletePiece,
		gardenMature,
		subPieces,
		plot
	}) => ({
		handleIsEditing,
		handleEditPiece,
		handleDeletePiece,
		gardenMature,
		subPieces,
		plot
	})
)(withPiece(EditPieces));
