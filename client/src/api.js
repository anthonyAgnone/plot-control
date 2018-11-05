import openSocket from 'socket.io-client';
import { Interval } from './lib/constants';
const socket = openSocket('http://localhost:8000');

function subscribeToTimer(callBack) {
	socket.on('timer', timestamp => callBack(null, timestamp));
	socket.emit('subscribeToTimer', Interval.interval);
}

function subscribeToChat(callBack) {
	socket.on('chat', connection => {
		callBack(null, connection);
	});
	socket.emit('subscribeToChat', 'connected to chat');
}

export { subscribeToTimer, subscribeToChat, socket };
