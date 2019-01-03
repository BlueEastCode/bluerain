import { BlueBase, BlueBaseConsumer } from '../../..';
import { Text, View } from 'react-native';
import { DynamicIcon } from '../../../getComponent';
import React from 'react';
import storiesOf from '@bluebase/storybook-addon';

storiesOf('DynamicIcon', module)

.add('should render an image with default size of 200x200', () => (
	<DynamicIcon type="image" size={200} source={{ uri: 'https://picsum.photos/200' }} />
))

.add('should render an custom component', () => {

	const CustomComponent = ({ size }: { size: number }) => (
		<View style={{ height: size, width: size, backgroundColor: 'red' }} />
	);

	return (<DynamicIcon type="component" component={CustomComponent} />);
})

.add('should render an custom component that is registered in component registry', () => (
	<BlueBaseConsumer children={(BB: BlueBase) => {


		const CustomComponent = ({ size }: { size: number }) => (
			<View style={{ height: size, width: size, backgroundColor: 'green' }} />
		);

		BB.Components.setValue('CustomComponent', CustomComponent);

		return (<DynamicIcon type="component" component="CustomComponent" />);
	}} />
))

.add('should render an Icon component', () => (
	<BlueBaseConsumer children={(BB: BlueBase) => {


		const Icon = ({ size, name }: { size: number, name: string }) => (
			<View style={{ height: size, width: size, backgroundColor: 'blue' }}>
				<Text>
					{name}
				</Text>
			</View>
		);

		BB.Components.setValue('Icon', Icon);

		return (<DynamicIcon type="icon" name="bus" />);
	}} />
));