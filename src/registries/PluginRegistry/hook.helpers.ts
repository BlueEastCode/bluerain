import { HookCollectionItem, HookListener } from '../HookRegistry';
import { Plugin } from './Plugin';
import { getDefiniteArray } from '../../utils';
import { getDefiniteBlueRainModule } from '../../api';
import isFunction from 'lodash.isfunction';

/**
 * Parses a single hook event of a plugin, and returns an array of listeners objects.
 * @param hookField
 * @param hookName
 * @param plugin
 */
export async function parsePluginHook
	(hookField: HookCollectionItem, hookName: string, plugin: Plugin) {

	const listeners: HookListener[] = [];

	// Each hookField maybe an array, we create one if its not
	// We've done this to allow multiple listeners against each hook
	const hookFieldArr = getDefiniteArray(hookField);

	let index = 0;

	// Iterate over each item of hookField
	for (const hookItem of hookFieldArr) {

		// Each hookField maybe a BlueRainModule, we create one if its not
		const item = getDefiniteBlueRainModule(hookItem);

		// Resolve listener, so if its another bundle, gets loaded here
		const handlerOrListener = await item.promise;

		// Final listener object
		const listener = !isFunction(handlerOrListener)
			? handlerOrListener as HookListener
			: { handler: handlerOrListener, name: `${plugin.slug}.${hookName}.${index}` };

		// Get listener name
		// const listenerName = listener.name;
		index++;

		listeners.push(listener);
	}

	return listeners;
}
