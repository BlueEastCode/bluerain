import BR, { BlueRain } from './index';
import { getContext, withContext } from 'recompose';
import PropTypes from 'prop-types';
import React from 'react';

export interface ProviderProperties {
	bluerain: BlueRain;
}

const BlueRainProvider = withContext(
	{ bluerain: PropTypes.object },
	(props: ProviderProperties) => ({
		bluerain: props.bluerain || BR
	})
)(props => React.Children.only(props.children)) as React.ComponentType<any>;

const withBlueRain = (Component: React.ComponentType<any>) =>
	getContext({ bluerain: PropTypes.object })(Component) as React.ComponentType<any>;

export { BlueRainProvider, withBlueRain };
