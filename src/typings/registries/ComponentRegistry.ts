import { StatefulComponent } from '../../components/StatefulComponent';
import Registry from '../../registries/ComponentRegistry';
import * as Components from '@blueeast/bluerain-ui-interfaces';
import React from 'react';

export interface ComponentRegistry extends Registry {
	StatefulComponent: StatefulComponent;
	ActivityIndicator: React.ComponentType<Components.ActivityIndicatorProperties>;
	AppBar: React.ComponentType<Components.AppBarProperties>;
	Avatar: React.ComponentType<Components.AvatarProperties>;
	Badge: React.ComponentType<Components.BadgeProperties>;
	Breadcrumb: React.ComponentType<Components.BreadcrumbProperties>;
	Button: React.ComponentType<Components.ButtonProperties>;
	Card: React.ComponentType<Components.CardProperties>;
	Carousel: React.ComponentType<Components.CarouselProperties>;
	Checkbox: React.ComponentType<Components.CheckboxProperties>;
	Chip: React.ComponentType<Components.ChipProperties>;
	Color: React.ComponentType<Components.ColorProperties>;
	Divider: React.ComponentType<Components.DividerProperties>;
	DocumentSelectionState: React.ComponentType<Components.DocumentSelectionStateProperties>;
	Drawer: React.ComponentType<Components.DrawerProperties>;
	FormControl: React.ComponentType<Components.FormControlProperties>;
	Icon: React.ComponentType<Components.IconProperties>;
	// Image:React.ComponentType<Components.ImageProperties>;
	List: React.ComponentType<Components.ListProperties>;
	Map: React.ComponentType<Components.MapProperties>;
	Modal: React.ComponentType<Components.ModalProperties>;
	Picker: React.ComponentType<Components.PickerProperties>;
	Pregressbar: React.ComponentType<Components.ProgressbarProperties>;
	SectionList: React.ComponentType<Components.SectionListProperties>;
	Slider: React.ComponentType<Components.SliderProperties>;
	StatusBar: React.ComponentType<Components.StatusBarProperties>;
	Switch: React.ComponentType<Components.SwitchProperties>;
	Tab: React.ComponentType<Components.TabProperties>;
	TabBar: React.ComponentType<Components.TabBarProperties>;
	Tabs: React.ComponentType<Components.TabsViewProperties>;
	// Text:React.ComponentType<Components.TextProperties>;
	TextInput: React.ComponentType<Components.TextInputProperties>;
	TouchableHighlight: React.ComponentType<Components.TouchableHighlightProperties>;
	TouchableOpacity: React.ComponentType<Components.TouchableOpacityProperties>;
	TouchableWithoutFeedback: React.ComponentType<Components.TouchableWithoutFeedbackProperties>;
	// View: React.ComponentType<Components.ViewProperties>;
	WebView: React.ComponentType<Components.WebViewProperties>;
}
