import React, { Component, createContext } from 'react';
import axios from 'axios';

const piecesUrl = '/api/pieces';
const usersUrl = '/api/users';
const plotUrl = '/api/plots';
const subPieceUrl = '/api/subPieces';

const { Consumer, Provider } = createContext();

export default class GameProvider extends Component {
	constructor(props) {
		super(props);
		this.state = {
			user: '',
			money: '',
			plot: '',
			plotName: '',
			pieces: [],
			editedPiece: null,
			subPieces: [],
			gardenMature: []
		};
		this.moveTo = this.moveTo.bind(this);
		this.findMissing = this.findMissing.bind(this);
		this.handleAddPiece = this.handleAddPiece.bind(this);
		this.handleRegister = this.handleRegister.bind(this);
		this.handleLogin = this.handleLogin.bind(this);
		this.handleLogout = this.handleLogout.bind(this);
		this.handleIsEditing = this.handleIsEditing.bind(this);
		this.handleEditPiece = this.handleEditPiece.bind(this);
		this.handleDeletePiece = this.handleDeletePiece.bind(this);
		this.handleAddSubPiece = this.handleAddSubPiece.bind(this);
		this.handleBuyRoom = this.handleBuyRoom.bind(this);
		this.handleSellPiece = this.handleSellPiece.bind(this);
		this.handleSellCrops = this.handleSellCrops.bind(this);
	}

	handleRegister(user, email, password) {
		const regPl = { name: user, email: email, password: password, money: 200 };
		axios
			.post(usersUrl, regPl)
			.then(response => {
				console.log(response, 'new user');
				this.setState({
					user: response.data._id,
					money: response.data.money
				});
				this.newPlot(response.data._id, response.data.name);
			})
			.catch(err => console.log(err));
	}

	newPlot(user_id, user_name) {
		const newPlot = {
			user: user_id,
			name: `${user_name}'s Plot`
		};
		axios.post(plotUrl, newPlot).then(response => {
			console.log(response, 'new Plot');
			this.setState({
				plot: response.data._id,
				plotName: response.data.name
			}).catch(err => console.log(err));
		});
	}

	findMissing(A) {
		const set = new Set(A);
		let i = 0;
		while (set.has(i)) {
			i++;
		}
		return i;
	}

	handleAddPiece(type, material, wall, totalTicks) {
		const piecePositions = [];
		this.state.pieces.map(piece => {
			piecePositions.push(piece.position[0] * 8 + piece.position[1]);
		});

		piecePositions.sort(function(a, b) {
			return a - b;
		});

		const missingPosition = this.findMissing(piecePositions);

		const posX = Math.floor(missingPosition / 8);
		const posY = missingPosition % 8;
		const newPosition = [posX, posY];

		const position = newPosition;
		const newObject = {
			type: type,
			position: position,
			material: material,
			wall: wall,
			plot: this.state.plot
		};

		axios
			.post(piecesUrl, newObject)
			.then(response => {
				const newArray = this.state.pieces.slice();
				newArray.push(response.data);
				this.setState({ pieces: newArray });
				if (newObject.type === 'garden') {
					const { _id, plot } = response.data;
					this.handleAddSubPiece(_id, plot, 'garden', totalTicks);
				}
			})
			.catch(err => console.log(err));
	}

	handleAddSubPiece(piece, plot, type, totalTicks) {
		const newObject = {
			type,
			createdTick: totalTicks,
			piece,
			plot
		};
		axios
			.post(subPieceUrl, newObject)
			.then(response => {
				const newArray = this.state.subPieces.slice();
				newArray.push(response.data);
				this.setState({ subPieces: newArray });
			})
			.catch(err => console.log(err));
	}

	handleLogin(email, password) {
		axios
			.post('/api/users/login', { email, password })
			.then(response => {
				this.setState({
					user: response.data._id,
					money: response.data.money
				});
				return response.data._id;
			})
			.then(id => this.handleGetPlot(id));
	}

	handleGetPlot(user_id) {
		axios.post('/api/plots/login', { id: user_id }).then(response => {
			this.setState({
				plot: response.data._id,
				plotName: response.data.name
			});
			this.handleGetPieces(response.data._id);
		});
	}

	handleGetPieces(plot_id) {
		axios
			.get(`/api/pieces?plot=${plot_id}`)
			.then(response => {
				const newArray = response.data;
				this.setState({
					pieces: newArray
				});
				this.handleGetSubPieces(plot_id);
			})
			.catch(err => console.log(err));
	}

	handleGetSubPieces(plot_id) {
		axios.post('/api/subPieces/login', { id: plot_id }).then(response => {
			const newArray = response.data;
			this.setState({
				subPieces: newArray
			}).catch(err => console.log(err));
		});
	}

	moveTo(x, y, _id) {
		this.setState(prevState => ({
			pieces: prevState.pieces.map(piece => {
				if (piece._id === _id) {
					return { ...piece, position: [x, y] };
				} else {
					return piece;
				}
			})
		}));
		axios.put(`/api/pieces/${_id}`, { position: [x, y] });
	}

	handleIsEditing(_id, type) {
		return e => {
			this.setState({
				editedPiece: _id
			});
		};
	}

	handleSellCrops(id) {
		const newArray = [...this.state.gardenMature];
		newArray.push(id);
		this.setState({
			gardenMature: newArray
		});
	}

	handleEditPiece(_id, material, wall, subPiece, plot, subPrice) {
		const editObject = {
			material: material,
			wall: wall
		};
		axios
			.put(`/api/pieces/${_id}`, editObject)
			.then(response => {
				this.setState(prevState => ({
					pieces: prevState.pieces.map(piece => (piece._id === _id ? response.data : piece))
				}));
				if (subPiece) {
					this.handleAddSubPiece(_id, plot, subPiece, 0);
					this.handleBuyRoom(subPrice);
				}
			})
			.catch(err => console.log(err));
	}
	handleDeletePiece(_id, amount) {
		const subDelete = this.state.subPieces.find(element => element.piece === _id);
		if (subDelete) {
			axios.delete(`/api/subPieces/${subDelete._id}`).then(() => {
				const newArray = [...this.state.subPieces];
				this.setState({
					subPieces: newArray.filter(subPiece => subPiece._id !== subDelete._id)
				});
			});
		}
		axios.delete(`/api/pieces/${_id}`).then(() => {
			const newArray = [...this.state.pieces];
			this.setState({
				pieces: newArray.filter(piece => piece._id !== _id)
			});
			this.handleSellPiece(amount);
		});
	}

	handleLogout() {
		this.setState({
			user: '',
			plot: '',
			plotName: '',
			pieces: []
		});
	}

	handleBuyRoom(price) {
		const newMoney = {
			money: this.state.money - price
		};
		axios.put(`/api/users/current/${this.state.user}`, newMoney).then(response => {
			this.setState({
				money: response.data.money
			});
		});
	}

	handleSellPiece(amount) {
		const newMoney = {
			money: this.state.money + amount
		};
		axios.put(`/api/users/current/${this.state.user}`, newMoney).then(response => {
			this.setState({
				money: response.data.money
			});
		});
	}

	render() {
		const value = {
			...this.state,
			moveTo: this.moveTo,
			handleAddPiece: this.handleAddPiece,
			handleRegister: this.handleRegister,
			handleLogin: this.handleLogin,
			handleLogout: this.handleLogout,
			handleIsEditing: this.handleIsEditing,
			handleEditPiece: this.handleEditPiece,
			handleDeletePiece: this.handleDeletePiece,
			handleBuyRoom: this.handleBuyRoom,
			handleSellCrops: this.handleSellCrops
		};
		return <Provider value={value}>{this.props.children}</Provider>;
	}
}

export const withGameContext = (mapStateToProps = value => value) => C => props => (
	<Consumer>{value => <C {...mapStateToProps(value)} {...props} />}</Consumer>
);
