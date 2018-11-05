import React from 'react';
import { withGameContext } from './GameProvider';
import { DropTarget } from 'react-dnd';
import { Types } from '../lib/constants';

const spec = {
	drop({ moveTo, x, y }, monitor) {
		const { _id } = monitor.getItem();
		moveTo(x, y, _id);
	},
	canDrop({ children }) {
		return !children;
	}
};

const collect = (connect, monitor) => {
	return {
		connectDropTarget: connect.dropTarget(),
		isOver: monitor.isOver()
	};
};

const styleBackground = isOver => {
	if (isOver) return 'rgba(255,255,255, .2';
	else return 'transparent';
};
function Grid({ connectDropTarget, isOver, children }) {
	const squareStyle = {
		backgroundColor: styleBackground(isOver),
		width: '12.5%',
		height: '12.5%'
	};
	return connectDropTarget(
		<div style={squareStyle} className="square-container">
			{children}
		</div>
	);
}

// export default withGameContext()()(DropTarget(Types.PIECE, spec, collect)(Grid));
export default withGameContext(({ moveTo }) => ({ moveTo }))(
	DropTarget(Types.PIECE, spec, collect)(Grid)
);
