import StatefulComponent, {
	EmptyState,
	ErrorState,
	LoadingState
} from '../components/StatefulComponent';
import { BlueRain } from '../index';

import CenterLayout from '../layouts/CenterLayout';
import ComponentState from '../components/ComponentState';
import ErrorPage from '../pages/ErrorPage';

import IconEnhanced from '../components/IconEnhanced';
import ImageBackground from '../components/ImageBackground';
import IndexPage from '../pages/IndexPage';
import LoadingPage from '../pages/LoadingPage';
import NotFoundPage from '../pages/NotFoundPage';

import Page from '../components/Page';
import SystemApp from '../components/SystemApp';
import SystemContent from '../components/SystemContent';
import SystemFooter from '../components/SystemFooter';
import SystemHeader from '../components/SystemHeader';
import SystemLayout from '../layouts/SystemLayout';
import Wallpaper from '../components/Wallpaper';

export const registerComponents = (BR: BlueRain) => {
	/* Internal Components */
	BR.Components.set('ComponentState', ComponentState);
	BR.Components.set('IconEnhanced', IconEnhanced);
	BR.Components.set('ImageBackground', ImageBackground);
	BR.Components.set('Page', Page);
	BR.Components.set('Wallpaper', Wallpaper);

	BR.Components.set('StatefulComponent', StatefulComponent);
	BR.Components.set('EmptyState', EmptyState);
	BR.Components.set('ErrorState', ErrorState);
	BR.Components.set('LoadingState', LoadingState);

	/* Register Layout Components */
	BR.Components.set('CenterLayout', CenterLayout);
	BR.Components.set('SystemLayout', SystemLayout);

	/* Register Pages */
	BR.Components.set('ErrorPage', ErrorPage);
	BR.Components.set('IndexPage', IndexPage);
	BR.Components.set('LoadingPage', LoadingPage);
	BR.Components.set('NotFoundPage', NotFoundPage);

	/* Main System Component */
	BR.Components.set('SystemHeader', SystemHeader);
	BR.Components.set('SystemContent', SystemContent);
	BR.Components.set('SystemFooter', SystemFooter);
	BR.Components.set('SystemApp', SystemApp);
};
