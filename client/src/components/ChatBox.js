import React, { Component } from 'react';
import { subscribeToChat, socket } from '../api';

export default class ChatBox extends Component {
	constructor(props) {
		super(props);

		this.state = {
			messages: [],
			sentMessage: ''
		};
		this.sendSocketIO = this.sendSocketIO.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}
	sendSocketIO(e) {
		e.preventDefault();
		socket.emit('sent_message', this.state.sentMessage);
		e.target.reset();
	}
	handleChange({ target: { name, value } }) {
		this.setState({
			[name]: value
		});
	}

	componentDidMount() {
		subscribeToChat((err, message) => {
			this.setState(({ messages }) => ({
				messages: [...messages, message]
			}));
		});
	}
	render() {
		const style = {
			chatHeader: {
				backgroundColor: '#1f2b0e'
			},
			body: {
				height: '50%',
				width: '100%',
				padding: '5%',
				overflowY: 'scroll',
				color: '#000'
			},
			form: {
				display: 'flex',
				justifyContent: 'space-between',
				padding: '0 5px',
				button: {
					backgroundColor: '#1f2b0e',
					border: 0,
					borderRadius: '4px',
					color: '#fff'
				}
			}
		};
		return (
			<div ref={div => (this.chatBox = div)} className="chat-box">
				<div className="chat-header" style={style.chatHeader}>
					<p>General Chat</p>
				</div>
				<div style={style.body} className="chat-body">
					{this.state.messages.map(msg => (
						<p>
							{msg.from}: {msg.content}
						</p>
					))}
				</div>
				<form style={style.form} onSubmit={this.sendSocketIO}>
					<input onChange={this.handleChange} type="text" name="sentMessage" />
					<button style={style.form.button}>Submit</button>
				</form>
			</div>
		);
	}
}
