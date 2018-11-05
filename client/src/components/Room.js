import React from 'react';
import { DragSource } from 'react-dnd';

import { Types } from '../lib/constants';

import wood from '../assets/wood2.png';
import tile from '../assets/tile.png';
import plywood from '../assets/plywood.jpg';
import planks from '../assets/planks.jpg';
import decBrick from '../assets/decBrick.jpg';
import gravel from '../assets/gravel.jpg';

import GrowingPlant from './GrowingPlant';

import '../assets/css/room.css';
import SubPiece from './SubPiece';

const spec = {
	beginDrag({ _id }) {
		return { _id };
	}
};

const collect = (connect, monitor) => {
	return {
		dragSource: connect.dragSource(),
		isDragging: monitor.isDragging()
	};
};

function Room({ dragSource, isDragging, type, material, wall, handleIsEditing, child }) {
	const materialBackground = () => {
		if (material === 'wood') {
			return wood;
		} else if (material === 'tile') {
			return tile;
		} else if (material === 'plywood') {
			return plywood;
		} else if (material === 'planks') {
			return planks;
		} else if (material === 'decBrick') {
			return decBrick;
		}
	};

	const calcWall = () => {
		if (wall === 'east') return '0 10px 0 0';
		else if (wall === 'south') return '0 0 10px 0';
		else if (wall === 'west') return '0 0 0 10px';
		else if (wall === 'north') return '10px 0 0 0';
		else if (wall === 'northWest') return '10px 0 0 10px';
		else if (wall === 'northEast') return '10px 10px 0 0';
		else if (wall === 'southWest') return '0 0 10px 10px';
		else if (wall === 'southEast') return '0 10px 10px 0';
		else if (wall === 'northSouthEast') return '10px 10px 10px 0';
		else if (wall === 'northSouthWest') return '10px 0 10px 10px';
		else if (wall === 'southEastWest') return '0 10px 10px 10px';
		else if (wall === 'northEastWest') return '10px 10px 0 10px';
		else if (wall === 'northSouth') return '10px 0 10px 0';
		else if (wall === 'eastWest') return '0 10px 0 10px';
		else return '0';
	};

	const calcWalkwayWidth = () => {
		if (wall === 'east') return '90%';
		else if (wall === 'south') return '100%';
		else if (wall === 'north') return '100%';
		else if (wall === 'west') return '90%';
		else if (wall === 'northWest') return '90%';
		else if (wall === 'northEast') return '90%';
		else if (wall === 'southWest') return '90%';
		else if (wall === 'southEast') return '90%';
		else if (wall === 'northSouthEast') return '90%';
		else if (wall === 'northSouthWest') return '90%';
		else if (wall === 'southEastWest') return '80%';
		else if (wall === 'northEastWest') return '80%';
		else if (wall === 'northSouth') return '100%';
		else if (wall === 'eastWest') return '80%';
		else return '100%';
	};
	const calcWalkWayHeight = () => {
		if (wall === 'east') return '100%';
		else if (wall === 'south') return '90%';
		else if (wall === 'north') return '90%';
		else if (wall === 'west') return '100%';
		else if (wall === 'northWest') return '90%';
		else if (wall === 'northEast') return '90%';
		else if (wall === 'southWest') return '90%';
		else if (wall === 'southEast') return '90%';
		else if (wall === 'northSouthEast') return '80%';
		else if (wall === 'northSouthWest') return '80%';
		else if (wall === 'southEastWest') return '90%';
		else if (wall === 'northEastWest') return '90%';
		else if (wall === 'northSouth') return '80%';
		else if (wall === 'eastWest') return '100%';
		else return '100%';
	};
	const calcWalkwayMargin = () => {
		if (wall === 'east') return '0';
		else if (wall === 'south') return '0';
		else if (wall === 'north') return '10% 0 0 0';
		else if (wall === 'west') return '0 0 0 10%';
		else if (wall === 'northWest') return '10% 0 0 10%';
		else if (wall === 'northEast') return '10% 0 0 0';
		else if (wall === 'southWest') return '0 0 0 10%';
		else if (wall === 'southEast') return '0';
		else if (wall === 'northSouthEast') return '10% 0 0 0';
		else if (wall === 'northSouthWest') return '10% 0 0 10%';
		else if (wall === 'southEastWest') return '0 auto';
		else if (wall === 'northEastWest') return '10% 10% 0 10%';
		else if (wall === 'northSouth') return '10% auto 0 auto';
		else if (wall === 'eastWest') return '0 auto';
		else return 0;
	};
	const style = {
		room: {
			backgroundImage: `url(${materialBackground()})`,
			opacity: isDragging ? 0 : 1,
			borderWidth: calcWall()
		},
		garden: {
			opacity: isDragging ? 0 : 1
		},
		gravel: {
			opacity: isDragging ? 0 : 1,
			backgroundImage: `url(${gravel})`,
			width: calcWalkwayWidth(),
			height: calcWalkWayHeight(),
			margin: calcWalkwayMargin()
		}
	};

	return dragSource(
		<div onClick={handleIsEditing} style={style[type]} className={`piece ${type}`}>
			{child ? (
				type === 'garden' ? (
					<GrowingPlant id={child._id} createdTick={child.createdTick} />
				) : (
					<SubPiece type={child.type} createdTick={child.createdTick} />
				)
			) : null}
		</div>
	);
}

export default DragSource(Types.PIECE, spec, collect)(Room);
