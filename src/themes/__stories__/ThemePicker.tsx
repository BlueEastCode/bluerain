import { useBlueBase, useTheme } from '../../';

import { Picker } from 'react-native';
import React from 'react';
import { ThemeItem } from '../../registries';

export const ThemePicker = () => {
	const BB = useBlueBase();
	const themes = [...BB.Themes.entries()];
	const { theme, changeTheme } = useTheme();

	return (
		<Picker selectedValue={theme.key} style={{ width: 150 }} onValueChange={changeTheme}>
			{themes.map((entry: [string, ThemeItem]) => {
				const t = entry[1].value;
				return <Picker.Item label={t.name} value={t.key} key={t.key} />;
			})}
		</Picker>
	);
};
