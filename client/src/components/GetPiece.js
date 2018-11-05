import React from 'react';
import { withGameContext } from './GameProvider';

const GetPiece = ({ component: C, editedPiece, pieces, ...props }) => {
	const pieceToEdit = pieces.find(piece => piece._id === editedPiece);
	return <C {...pieceToEdit} {...props} />;
};

export default withGameContext()(GetPiece);

export const withPiece = C =>
	withGameContext(({ editedPiece, pieces }) => ({ editedPiece, pieces }))(props => (
		<GetPiece component={C} {...props} />
	));
