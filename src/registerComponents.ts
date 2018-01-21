import BR from './index';

import ImageBackground from './components/ImageBackground';
import Page from './components/Page';
import Wallpaper from './components/Wallpaper';

import SystemLayout from './layouts/SystemLayout';
import IndexPage from './pages/IndexPage';
import NotFoundPage from './pages/NotFoundPage';

import SystemApp from './SystemApp';

export default () => {
	/* Internal Components */
	BR.Components.set('ImageBackground', ImageBackground);
	BR.Components.set('Page', Page);
	BR.Components.set('Wallpaper', Wallpaper);

	/* Register Layout Components */
	BR.Components.set('SystemLayout', SystemLayout);

	/* Register Pages */
	BR.Components.set('IndexPage', IndexPage);
	BR.Components.set('NotFoundPage', NotFoundPage);

	/* Main System Component */
	BR.Components.set('BlueRainApp', SystemApp);
};
