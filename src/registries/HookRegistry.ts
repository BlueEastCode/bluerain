import Registry from './Registry';
import isnil from 'lodash.isnil';

export type HookFn<Context = {}> = (value: any, args: { [key: string]: any }, ctx: Context) => any | Promise<any>;

export type HookItem<Context = {}> = {
	name: string;
	listener: HookFn<Context>;
};

export type HookRegistryItem<Context = {}> = Array<HookItem<Context>>;

export default class HookRegistry<Parent = {}> extends Registry<HookRegistryItem<Parent>, Parent> {

	/**
	 * Add a hook listener. If the hook listener already exists, it will throw and Error.
	 * @param hookName Name to the hook to subscribe to
	 * @param listenerName Name of the lister or the source of the listener
	 * @param listener Listener function
	 * @param index Position to insert this hook at
	 */
	public tap(hookName: string, listenerName: string, listener: HookFn<Parent>, index?: number) {

		const item: HookItem<Parent> = {
			name: listenerName,
			listener,
		};

		const hookItems = this.get(hookName);

		// If there are no items of this hookName yet, 
		// Initialize new array
		if (isnil(hookItems) || hookItems.length === 0) {
			this.set(hookName, [item]);
			return;
		}
		
		const found = hookItems.find(item => item.name === listenerName);
		if (!isnil(found)) {
			throw new Error(`Hook Listener ${listenerName} already exists in ${hookName} hook.`);
		}

		if (isnil(index)) {
			this.set(hookName, [...hookItems, item]);
		} else {
			this.set(hookName, [...hookItems].splice(index, 0, item));
		}
	}

	/**
	 * Remove a hook listener.
	 * @param hookName Name to the hook to subscribe to
	 * @param listenerName Name of the lister or the source of the listener
	 */
	public untap(hookName: string, listenerName: string) {

		if (!this.has(hookName)) {
			throw Error(`${hookName} hook does not exist.`);
		}

		if (isnil(listenerName)) {
			throw Error(
				`Hook name cannot be ${listenerName}. Please provide valid function name while removing filter.`
			);
		}

		let list = this.get(hookName) || [];
		const index = list.findIndex(item => !!(item && item.name === listenerName));

		if (index === -1) {
			throw new Error(
				`${listenerName} listener is not added in ${hookName} hook.`
			);
		}

		list = list.splice(index, 1);;
		this.set(hookName, list);
	}

	/**
	 * Run all hook listeners in a waterfall.
	 * Each listener function gets 3 arguments:
	 * 	- value
	 * 	- args
	 * 	- context
	 * 
	 * Each listener function is expected to return a value.
	 * 
	 * Example Usage: BR.Hooks.run('hook-name', val, args);
	 * 
	 * @param hookName Name of the hook
	 * @param value Initial value to send to the hook
	 * @param args Any extra arguments to pass to the hook
	 */
	public async run(hookName: string, initialValue: any, args: { [key: string]: any } = {}) {

		// Get all hook items registered for hookName
		const hookItems: HookRegistryItem<Parent> = this.data.get(hookName) || [];

		// If there are no hook items registered for this hook
		if (isnil(hookItems) || hookItems.length === 0) {
			return initialValue;
		}

		// // If there is only one item
		// if (hookItems.length === 1) {
		// 	return Promise.resolve(hookItems[0].listener(initialValue, args, this.ctx));
		// }

		// Run waterfall
		return hookItems.reduce(async (accumulator, hookItem) => {

			// Resolve value before sending forward
			const hookValue = await accumulator;

			// Execute hook function
			const result = await hookItem.listener(hookValue, args, this.ctx);

			// If the hook didn't return any value, return previous accumulator
			if (typeof result === 'undefined') {

				// if result of current iteration is undefined, don't pass it on
				console.warn(`Warning: Sync filter [${hookItem.name}] in hook [${hookName}] didn't return a result!`);
				return hookValue;
			}

			return result;

		}, Promise.resolve(initialValue));
	}
}