import { Text as NativeText, TextProps as NativeTextProps, TextStyle } from 'react-native';
import React from 'react';
import { ThemeValue } from '../../themes';

export interface TextProps extends NativeTextProps {
	styles?: {
		root?: TextStyle
	}
}

export const Text: React.ComponentType<TextProps> = ({ styles, style, ...rest }: TextProps) => (
	<NativeText style={[styles && styles.root, style]} {...rest} />
);

(Text as any).defaultStyles = (theme: ThemeValue) => ({ root: theme.typography.body1 });
