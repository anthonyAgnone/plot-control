import React, { Fragment } from 'react';
import { withGameContext } from './GameProvider';

import Clock from './Clock';
import Ground from './Ground';

import PieceManip from './PieceManip';
import EditPieces from './EditPieces';

import '../assets/css/plot.css';

function Plot({ plotName, pieces, money }) {
	return (
		<Fragment>
			<h1 className="plot-name">{plotName}</h1>
			<h3 className="money">$ {money}</h3>
			<Ground n={8} />
			<Clock />
			<PieceManip />
			{pieces.length ? <EditPieces /> : null}
		</Fragment>
	);
}

// export default withGameContext()()(Plot);
export default withGameContext(({ plotName, pieces, money }) => ({
	plotName,
	pieces,
	money
}))(Plot);
