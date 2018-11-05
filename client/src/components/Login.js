import React, { Component } from 'react';
import { withGameContext } from './GameProvider';

class Login extends Component {
	constructor(props) {
		super(props);

		this.state = {
			email: '',
			password: ''
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange({ target: { name, value } }) {
		this.setState({
			[name]: value
		});
	}
	handleSubmit(e) {
		e.preventDefault();
		const { email, password } = this.state;
		console.log(email, password);
		this.props.handleLogin(email, password);
		setTimeout(this.props.animation(), 2000);
	}

	render() {
		return (
			<div className="form">
				<h1>Login</h1>
				<form onSubmit={this.handleSubmit}>
					<input onChange={this.handleChange} name="email" type="text" />
					<label htmlFor="email">Email</label>
					<input onChange={this.handleChange} type="password" name="password" id="password" />
					<label htmlFor="password">Password</label>
					<button>Submit</button>
				</form>
			</div>
		);
	}
}

// export default withGameContext()()(Login);
export default withGameContext(({ handleLogin }) => ({ handleLogin }))(Login);
