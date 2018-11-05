import React, { Component } from 'react';
import { withTimeContext } from './TimeProvider';
import { withGameContext } from './GameProvider';
import stage0plant from '../assets/stage0plant.png';
import stage1plant from '../assets/stage1plant.png';
import stage2plant from '../assets/stage2plant.png';
import stage3plant from '../assets/stage3plant.png';

class GrowingPlant extends Component {
	constructor(props) {
		super(props);

		this.state = {
			canSell: false
		};
	}
	sellPlant() {
		this.props.handleSellCrops(this.props.id);
	}

	render() {
		const calcHeight = () => {
			return 1;
		};
		const calcStage = () => {
			if (this.state.canSell === false) {
				const { createdTick, totalTicks } = this.props;
				if (createdTick + 180 > totalTicks) return stage1plant;
				else if (createdTick + 360 > totalTicks) return stage2plant;
				else if (createdTick + 720 > totalTicks) {
					this.setState({
						canSell: true
					});
					this.sellPlant();
					return stage3plant;
				} else return stage0plant;
			} else return stage3plant;
		};
		const style = {
			plant: {
				pointerEvents: 'none',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				width: '100%',
				height: '100%',
				transform: `rotateX(0deg) rotateY(0deg) rotateZ(45deg) scaleX(.5) scaleY(${calcHeight()}) translate(-5%, -39%)`
			}
		};

		return (
			<div style={style.plant}>
				<img src={calcStage()} alt="" />
			</div>
		);
	}
}

export default withTimeContext(
	withGameContext(({ handleSellCrops }) => ({ handleSellCrops }))(GrowingPlant)
);
