import React, { Component } from 'react';
import { withGameContext } from './GameProvider';

class Register extends Component {
	constructor(props) {
		super(props);

		this.state = {
			user: '',
			password: '',
			email: ''
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
		const { user, email, password } = this.state;
		this.props.handleRegister(user, email, password);
		setTimeout(this.props.animation(), 2000);
	}

	render() {
		return (
			<div className="form" onSubmit={this.handleSubmit}>
				<h1>Register</h1>
				<form>
					<input onChange={this.handleChange} name="user" type="text" />
					<label htmlFor="username">User Name</label>
					<input onChange={this.handleChange} type="email" name="email" id="email" />
					<label htmlFor="email">Email</label>
					<input onChange={this.handleChange} type="password" name="password" id="password" />
					<label htmlFor="password">Password</label>
					<button>Submit</button>
				</form>
			</div>
		);
	}
}

// export default withGameContext()()(Register);
export default withGameContext(({ handleRegister }) => ({ handleRegister }))(Register);
