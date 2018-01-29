import React from 'react';
import { withBlueRain, BlueRainType } from '../../index';

export interface IconProps {
	title: string,
	color: string
}

const Icon = (props: IconProps & { bluerain: BlueRainType }) => {

	const { bluerain: BR, title, color } = props;

	const Text = BR.Components.get('Text');
	const backgroundColor = color || 'rgb(220,53,69)';

	const titleStyle = BR.Utils.createStyleSheet({
		alignSelf: 'center',
		textAlign: 'center',
		backgroundColor,
		borderColor: backgroundColor,
		borderRadius: 10,
		borderWidth: 1,
		color: '#fff',
		fontSize: 68,
		marginBottom: 20,
		padding: 20,
		shadowOffset: { height: 5, width: 0 },
		shadowRadius: 15,
		shadowColor: 'rgba(0,0,0,.3)'
	}, 'Text');

	return <Text style={titleStyle}>{title}</Text>;
};

export default withBlueRain(Icon);