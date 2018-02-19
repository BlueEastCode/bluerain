import { BlueRain,BlueRainConsumer } from './index';
import React from 'react';
import storiesOf from '../storybook/storiesOf';

storiesOf('Provider', module)

	.add('BlueRainConsumer', () => (
		<BlueRainConsumer>
		{(BR: BlueRain) => <BR.Components.Text>Hello! I'm consuming BlueRain via Render Prop</BR.Components.Text>}
		</BlueRainConsumer>
	));
