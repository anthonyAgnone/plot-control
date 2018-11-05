import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Sky from './components/Sky';
import LandingPage from './components/LandingPage';
import Plot from './components/Plot';
import Map from './components/Map';

export default class App extends Component {
	render() {
		return (
			<div className="App">
				<Sky />
				<Switch>
					<Route path="/" exact>
						{({ match }) => <LandingPage show={match !== null} />}
					</Route>
					<Route path="/plot">{({ match }) => <Plot show={match !== null} />}</Route>
					<Route path="/map">{({ match }) => <Map show={match !== null} />}</Route>
				</Switch>
			</div>
		);
	}
}
