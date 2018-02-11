import { BlueRain, withBlueRain } from '../../index';
import { ImageStyle, ViewProperties, ViewStyle } from '@blueeast/bluerain-ui-interfaces';
import React from 'react';

export interface ComponentStateImageProps extends ViewProperties {
	/**
	 * Image Component, if provided, imageSource will be ignored
	 */
	image?: React.ComponentType;

	/**
	 * Image styles
	 */
	imageStyle?: ImageStyle;

	/**
	 * Image source
	 */
	imageSource?: string;

	style?: ViewStyle;

	bluerain: BlueRain;
}

const ComponentStateImage = (props: ComponentStateImageProps) => {
	const {
		image: ImageComponent,
		imageSource,
		imageStyle,
		bluerain: BR
	} = props;

	// Image
	let ImageC;

	if (ImageComponent || imageSource) {
		ImageC = ImageComponent || BR.Components.Image;

	} else {
		return null;
	}

	// Styles
	const stylesheet = { marginBottom: 10, maxWidth: 200 };

	return (
  <BR.Components.View style={BR.Utils.createStyleSheet(stylesheet)}>
		<ImageC
			style={imageStyle ? BR.Utils.createStyleSheet(imageStyle) : {}}
			source={imageSource}
		/>
  </BR.Components.View>
	);
};

export default withBlueRain(ComponentStateImage);