// tslint:disable:max-classes-per-file
import { BlueBase } from '../../../BlueBase';
import { PluginRegistry } from '../PluginRegistry';
import { createBlueBaseModule } from '../../../utils';

describe.only('PluginRegistry', () => {

	describe('.register method', () => {

		it('should register a Plugin', async () => {

			const BB = new BlueBase();
			const Plugins = new PluginRegistry(BB);

			await Plugins.register({
				key: 'dummy-plugin',
				name: 'Dummy Plugin',
				value: {},
			});

			const item = Plugins.get('dummy-plugin');

			expect((item as any).name).toBe('Dummy Plugin');
		});

		// it('should register a Plugin with auto generated slug', async () => {

		// 	const BB = new BlueBase();
		// 	const Plugins = new PluginRegistry(BB);

		// 	// const Plugins = new PluginRegistry(BB);
		// 	await Plugins.register(new Plugin({ name: 'DummyPlugin' }));

		// 	const plugin = await Plugins.resolve('dummy-plugin');

		// 	if (!plugin) {
		// 		throw Error();
		// 	}

		// 	expect(plugin.name).toBe('DummyPlugin');
		// });

		it('should register a Plugin from an ES Module', async () => {
			const BB = new BlueBase();
			const Plugins = new PluginRegistry(BB);

			await Plugins.register({
				__esModule: true,
				default:
				{
					key: 'dummy-plugin',
					name: 'Dummy Plugin',
					value: {},
				}
			} as any);


			const item = Plugins.get('dummy-plugin');

			expect((item as any).name).toBe('Dummy Plugin');
		});

		it('should register a Plugin from a Promised ES Module', async () => {
			const BB = new BlueBase();
			const Plugins = new PluginRegistry(BB);

			await Plugins.register(Promise.resolve({
				__esModule: true,
				default:
				{
					key: 'dummy-plugin',
					name: 'Dummy Plugin',
					value: {},
				}
			}) as any);

			const item = Plugins.get('dummy-plugin');

			expect((item as any).name).toBe('Dummy Plugin');
		});

		it('should register a Plugin from an ES Module in a BlueBaseModule', async () => {
			const BB = new BlueBase();
			const Plugins = new PluginRegistry(BB);

			await Plugins.register(createBlueBaseModule({
				__esModule: true,
				default:
				{
					key: 'dummy-plugin',
					name: 'Dummy Plugin',
					value: {},
				}
			}) as any);


			const item = Plugins.get('dummy-plugin');

			expect((item as any).name).toBe('Dummy Plugin');
		});

		it('should register a Plugin from a Promise', async () => {
			const BB = new BlueBase();
			const Plugins = new PluginRegistry(BB);

			await Plugins.register(Promise.resolve({
				key: 'dummy-plugin',
				name: 'Dummy Plugin',
				value: {},
			}) as any);


			const item = Plugins.get('dummy-plugin');

			expect((item as any).name).toBe('Dummy Plugin');
		});

		it('should throw an error if unknown class is registered', async () => {
			const BB = new BlueBase();
			const Plugins = new PluginRegistry(BB);

			let message = false;

			class Foo {
				public foo = 'bar';
			}

			try {
				await Plugins.register(Foo as any);
			} catch (e) {
				message = e.message;
			}

			expect(message).toBe('Could not register item. Reason: No item given.');
		});

		it('should throw an error if plugin is not provided', async () => {
			const BB = new BlueBase();
			const Plugins = new PluginRegistry(BB);

			let message = false;

			try {
				await Plugins.register(undefined as any);
			} catch (e) {
				message = e.message;
			}

			expect(message)
				.toBe('Could not register item. Reason: No item given.');
		});

		it('should throw an error if empty object is registered', async () => {
			const BB = new BlueBase();
			const Plugins = new PluginRegistry(BB);

			let message = false;

			try {
				await Plugins.register({} as any);
			} catch (e) {
				message = e.message;
			}

			expect(message).toBe('Could not register item. Reason: No item given.');
		});

		it('should throw an error if unknown data type is registered', async () => {
			const BB = new BlueBase();
			const Plugins = new PluginRegistry(BB);

			let message = false;

			try {
				await Plugins.register('foo' as any);
			} catch (e) {
				message = e.message;
			}

			expect(message).toBe('Could not register item. Reason: No item given.');
		});

		it('should throw an error if name is not provided', async () => {
			const BB = new BlueBase();
			const Plugins = new PluginRegistry(BB);

			let message = false;

			try {
				await Plugins.register({} as any);
			} catch (e) {
				message = e.message;
			}

			expect(message).toBeTruthy();
		});

	});


	describe('.unregister method', () => {

		it('should unregister a Plugin', async () => {
			const BB = new BlueBase();
			const Plugins = new PluginRegistry(BB);

			await Plugins.register({
				key: 'dummy-plugin',
				name: 'Dummy Plugin',
				value: {},
			});


			const item = Plugins.get('dummy-plugin');

			expect((item as any).name).toBe('Dummy Plugin');

			Plugins.delete('dummy-plugin');

			const plugin = Plugins.get('dummy-plugin');
			expect(plugin).toBe(undefined);
		});

	});


	// describe('Initialization', () => {

	// 	it('should initialize plugins', async () => {
	// 		const BB = new BlueBase();
	// 		const Plugins = new PluginRegistry(BB);

	// 		// const Plugins = new PluginRegistry(BB);
	// 		await Plugins.register({
	// 			key: 'dummy-plugin',
	// 			meta: {
	// 				name: 'Dummy Plugin',
	// 			},
	// 			value: {
	// 				hooks: {
	// 					'an.event': (val: number) => val,
	// 					'another.event': (val: number) => val,
	// 				},
	// 			},
	// 		});

	// 		// const Plugins = new PluginRegistry(BB);
	// 		await Plugins.register({
	// 			key: 'dummy-plugin-2',
	// 			meta: {
	// 				name: 'Dummy Plugin 2',
	// 			},
	// 			value: {
	// 				hooks: {
	// 					'an.event': (val: number) => val,
	// 				},
	// 			},

	// 			hooks: {
	// 				'an.event': (val: number) => val,
	// 			},
	// 		});

	// 		expect(BB.Hooks.size()).toBe(0);

	// 		await BB.boot();

	// 		expect(BB.Hooks.get('an.event')).toHaveLength(2);
	// 		expect(BB.Hooks.get('another.event')).toHaveLength(1);
	// 	});

	// 	it('should not initialize disabled plugins', async () => {
	// 		const BB = new BlueBase();
	// 		const Plugins = new PluginRegistry(BB);

	// 		// const Plugins = new PluginRegistry(BB);
	// 		await Plugins.register({
	// 			enabled: false,
	// 			hooks: {
	// 				'an.event': (val: number) => val,
	// 				'another.event': (val: number) => val,
	// 			},
	// 			name: 'DummyPlugin',
	// 		});

	// 		// const Plugins = new PluginRegistry(BB);
	// 		await Plugins.register({
	// 			hooks: {
	// 				'an.event': (val: number) => val,
	// 			},
	// 			name: 'DummyPlugin2',
	// 		});

	// 		expect(BB.Hooks.size()).toBe(0);

	// 		await BB.boot();

	// 		expect(BB.Hooks.get('an.event')).toHaveLength(1);
	// 		expect(BB.Hooks.get('another.event')).toBe(undefined);
	// 	});

	// 	it('should not initialize plugins with hooks in a thunk', async () => {
	// 		const BB = new BlueBase();
	// 		const Plugins = new PluginRegistry(BB);

	// 		// const Plugins = new PluginRegistry(BB);
	// 		await Plugins.register({
	// 			hooks: () => ({
	// 				'an.event': (val: number) => val,
	// 				'another.event': (val: number) => val,
	// 			}),
	// 			name: 'DummyPlugin',
	// 		});

	// 		// const Plugins = new PluginRegistry(BB);
	// 		await Plugins.register({
	// 			hooks: () => ({
	// 				'an.event': (val: number) => val,
	// 			}),
	// 			name: 'DummyPlugin2',
	// 		});

	// 		expect(BB.Hooks.size()).toBe(0);

	// 		await BB.boot();

	// 		expect(BB.Hooks.get('an.event')).toHaveLength(2);
	// 		expect(BB.Hooks.get('another.event')).toHaveLength(1);
	// 	});

	// });


	// describe('.disable method', () => {

	// 	it('should disable plugin', async () => {
	// 		const BB = new BlueBase();
	// 		const Plugins = new PluginRegistry(BB);

	// 		// const Plugins = new PluginRegistry(BB);
	// 		await Plugins.register({
	// 			hooks: {
	// 				'an.event': (val: number) => val,
	// 				'another.event': (val: number) => val,
	// 			},
	// 			name: 'DummyPlugin',
	// 		});

	// 		expect(Plugins.isEnabled('dummy-plugin')).toBe(true);

	// 		await Plugins.disable('dummy-plugin');

	// 		expect(Plugins.isEnabled('dummy-plugin')).toBe(false);
	// 	});

	// });


	// describe('.enable method', () => {

	// 	it('should enable plugin', async () => {
	// 		const BB = new BlueBase();
	// 		const Plugins = new PluginRegistry(BB);

	// 		// const Plugins = new PluginRegistry(BB);
	// 		await Plugins.register({
	// 			enabled: false,
	// 			hooks: {
	// 				'an.event': (val: number) => val,
	// 				'another.event': (val: number) => val,
	// 			},
	// 			name: 'DummyPlugin',
	// 		});

	// 		expect(Plugins.isEnabled('dummy-plugin')).toBe(false);

	// 		await Plugins.enable('dummy-plugin');

	// 		expect(Plugins.isEnabled('dummy-plugin')).toBe(true);
	// 	});

	// });




	// describe('.getFromSlugOrPlugin method', () => {

	// 	it('should return a plugin from a string', async () => {
	// 		const BB = new BlueBase();
	// 		const Plugins = new PluginRegistry(BB);

	// 		// const Plugins = new PluginRegistry(BB);
	// 		await Plugins.register({
	// 			name: 'DummyPlugin',
	// 		});

	// 		expect((Plugins as any).getFromSlugOrPlugin('dummy-plugin').name).toBe('DummyPlugin');
	// 	});

	// 	it('should return a Plugin  object as is', async () => {
	// 		const BB = new BlueBase();
	// 		const Plugins = new PluginRegistry(BB);

	// 		// const Plugins = new PluginRegistry(BB);
	// 		const plugin = (new Plugin({
	// 			name: 'DummyPlugin',
	// 		})).setup();

	// 		expect((Plugins as any).getFromSlugOrPlugin(plugin).slug).toBe('dummy-plugin');
	// 	});

	// 	it('should throw an error for unknown Plugins', async () => {
	// 		const BB = new BlueBase();
	// 		const Plugins = new PluginRegistry(BB);

	// 		expect(() => (Plugins as any).getFromSlugOrPlugin('foo')).toThrow();
	// 	});

	// });

});