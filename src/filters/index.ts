import { boot } from './boot';
import { components } from './components';
import { configs } from './configs';
import { navigation } from './navigation';
import { plugins } from './plugins';
import { themes } from './themes';

export default {
	...boot,
	...components,
	...configs,
	...plugins,
	...navigation,
	...themes,
};