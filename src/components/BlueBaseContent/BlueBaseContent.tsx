/* eslint-disable react/prop-types */
import { MaybeRenderPropChildren, renderChildrenWithProps } from '../../utils';
import { NavigationProps, NavigatorProps } from '@bluebase/components';
import { StatusBar, StyleProp, ViewProps, ViewStyle } from 'react-native';
import { useBlueBase, useComponent, useIntl, useTheme } from '../../hooks';

import { BlueBase } from '../../BlueBase';
import { BlueBaseFilter } from '../BlueBaseFilter';
import React from 'react';
import { Theme } from '../../themes';

export interface BlueBaseContentStyles {
	backdrop: StyleProp<ViewStyle>;
}

export interface BlueBaseContentProps {
	children?: MaybeRenderPropChildren<{ BB: BlueBase }>;
	styles?: Partial<BlueBaseContentStyles>;
}

/**
 * 🏡 BlueBaseContent
 * @param props
 */
export const BlueBaseContent = (props: BlueBaseContentProps) => {
	const { children, styles } = props;
	const BB = useBlueBase();
	const Navigation = useComponent<NavigationProps>('Navigation');
	const View = useComponent<ViewProps>('View');

	const { theme } = useTheme();
	const intl = useIntl();

	return children ? (
		renderChildrenWithProps(children, { BB })
	) : (
		<View key="bluebase-wrapper" style={styles!.backdrop}>
			<StatusBar
				barStyle={theme.mode === 'dark' ? 'light-content' : 'dark-content'}
				translucent
				backgroundColor="transparent"
			/>
			<BlueBaseFilter filter="bluebase.navigator.root" value={{}} args={{ theme, BB, intl }}>
				{(navigator: NavigatorProps) => <Navigation navigator={navigator} />}
			</BlueBaseFilter>
		</View>
	);
};

BlueBaseContent.defaultStyles = (theme: Theme) => ({
	backdrop: {
		backgroundColor: theme.palette.background.default,
		flex: 1,
	},
});
