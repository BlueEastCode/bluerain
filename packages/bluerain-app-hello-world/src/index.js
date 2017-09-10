import React from 'react';
import { withBlueRain } from '@blueeast/bluerain-os';
console.log('hello', withBlueRain)

let App = (props) => {

	console.log(props);
	return <p>Hey There</p>;
};

App = withBlueRain(App);

App.appName = 'Hello World';

export default App;