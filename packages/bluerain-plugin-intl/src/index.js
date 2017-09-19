import React from 'react';
import { Plugin } from '@blueeast/bluerain-os';
import {
	// IntlProvider,
	addLocaleData,
	FormattedMessage,
	FormattedNumber,
	FormattedPlural,
	FormattedDate,
	FormattedTime,
	FormattedRelative
} from 'react-intl';

import { updateIntl, intlReducer } from './redux';
import IntlProvider from './redux/IntlProvider';

import defaultConfigs from './defaultConfigs';
import settings from './settings';

const rtlDetect = require('rtl-detect');

let messages = {};
const withIntl = App => props => (
  <IntlProvider>
    <App {...props} />
  </IntlProvider>
	);

/**
 * react-intl plugin to add internationalization to BlueRain Apps
 * @property {string} pluginName "InternationalizationPlugin"
 * @property {string} slug "intl"
 */
class InternationalizationPlugin extends Plugin {
	static pluginName = 'InternationalizationPlugin';
	static slug = 'intl';

	static initialize(config = {}, ctx) {

		config = Object.assign({}, defaultConfigs, config);

		let locale = ctx.Configs.get('locale');
		if (!locale) {
			locale = config.locale;
		}

		addLocaleData(config.localeData);

		// Registering Components
		ctx.Components.register('FormattedMessage', FormattedMessage);
		ctx.Components.register('FormattedNumber', FormattedNumber);
		ctx.Components.register('FormattedPlural', FormattedPlural);
		ctx.Components.register('FormattedDate', FormattedDate);
		ctx.Components.register('FormattedTime', FormattedTime);
		ctx.Components.register('FormattedRelative', FormattedRelative);

		// Add internationalization to main system app
		ctx.Filters.add(
      'bluerain.redux.app',
      function AddInternationalizationToSystemApp(App) { return withIntl(App); }
		);

		ctx.Filters.add(
			'bluerain.redux.initialState',
			function AddIntlInitState(state) {
				messages = ctx.Filters.run('bluerain.intl.messages', messages);
				return Object.assign({}, state, {
					bluerain: { 
						intl: { 
							locale,
							rtl: rtlDetect.isRtlLang(locale),
							messages: messages[locale] 
						} 
					}
				});
			}
		);

		ctx.Filters.add(
			'bluerain.redux.reducers.bluerain',
			function AddIntlReducer(reducers) {
				return Object.assign({}, reducers, {
					intl: intlReducer
				});
			}
		);

		// Add Settings
		ctx.Filters.add('app.settings.general', settings(ctx, config));
	}

	/**
	 * Change app's locale
	 *
	 * @param {string} locale The locale id
	 * @param {BlueRain} ctx	The BlueRain Context
	 */
	static setLocale(locale, ctx) {
		try {
			const localMessages = messages[locale];
			ctx.refs.store.dispatch(updateIntl({
				locale,
				messages: localMessages,
			}));
		} catch (e) {
			console.log('There was an error changing locale');
		}
	}
}

export default InternationalizationPlugin;
