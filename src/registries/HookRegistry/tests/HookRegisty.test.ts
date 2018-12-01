declare var global: any;

import { BlueBase } from '../../../BlueBase';
import { DEFAULT_HOOK_PRIORITY } from '../defaults';
import { Hook } from '../../../models/Hook';
import { HookRegistry } from '../HookRegistry';
import { createBlueBaseModule } from '../../../utils';

const BB = new BlueBase();

describe('HookRegistry', () => {

	describe('.register method', () => {

		it('should register listener', async () => {

			const Hooks = new HookRegistry(BB);
			await Hooks.register('hook1', { name: 'listener1', handler: () => 'foo1' });
			const hooks = Hooks.get('hook1') as Hook[];

			expect(hooks.length).toBe(1);
			expect(hooks[0].name).toBe('listener1');
		});

		it('should register listener with auto generated ID', async () => {

			const Hooks = new HookRegistry(BB);
			const hook = await Hooks.register('hook1', { handler: () => 'foo1' });
			const hooks = Hooks.get('hook1') as Hook[];

			expect(hooks.length).toBe(1);
			expect(hooks[0].name).toBe(hook.name);
		});

		it('should register listener from an ES Module', async () => {

			const Hooks = new HookRegistry(BB);
			await Hooks.register('hook1', createBlueBaseModule({ name: 'listener1', handler: () => 'foo1' }));
			const hooks = Hooks.get('hook1') as Hook[];

			expect(hooks.length).toBe(1);
			expect(hooks[0].name).toBe('listener1');
		});

		it('should register listener from a Promised ES Module', async () => {

			const Hooks = new HookRegistry(BB);
			await Hooks.register(
				'hook1', createBlueBaseModule(Promise.resolve({ name: 'listener1', handler: () => 'foo1' }) as any));
			const hooks = Hooks.get('hook1') as Hook[];

			expect(hooks.length).toBe(1);
			expect(hooks[0].name).toBe('listener1');
		});

		it('should throw an error if duplicate listener is registered', async () => {

			const Hooks = new HookRegistry(BB);
			await Hooks.register('hook1', { name: 'listener1', handler: () => 'foo1' });

			let message = false;

			try {
				await Hooks.register('hook1', { name: 'listener1', handler: () => 'foo2' });
			} catch (e) {
				message = e.message;
			}

			expect(message).toBeTruthy();
		});

		it('should register listener mulitple listeners', async () => {

			const Hooks = new HookRegistry(BB);
			await Hooks.register('hook1', { name: 'listener1', handler: () => 'foo1' });
			await Hooks.register('hook1', { name: 'listener2', handler: () => 'foo2' });
			const hooks = Hooks.get('hook1') as Hook[];

			expect(hooks.length).toBe(2);
			expect(hooks[1].name).toBe('listener2');
		});

		it('should register listener with given priority', async () => {

			const Hooks = new HookRegistry(BB);
			await Hooks.register('hook1', { name: 'listener1', handler: () => 'foo1', priority: 5 });
			const hooks = Hooks.get('hook1') as Hook[];

			expect(hooks[0].priority).toBe(5);
		});

		it('should register listener with default priority', async () => {

			const Hooks = new HookRegistry(BB);
			await Hooks.register('hook1', { name: 'listener1', handler: () => 'foo1' });
			const hooks = Hooks.get('hook1') as Hook[];

			expect(hooks[0].priority).toBe(DEFAULT_HOOK_PRIORITY);
		});

	});


	describe('.unregister method', () => {

		it('should unregister listener', async () => {

			const Hooks = new HookRegistry(BB);
			await Hooks.register('hook1', { name: 'listener1', handler: () => 'foo1' });
			await Hooks.register('hook1', { name: 'listener2', handler: () => 'foo2' });
			await Hooks.register('hook1', { name: 'listener3', handler: () => 'foo3' });
			Hooks.unregister('hook1', 'listener2');

			const hooks = Hooks.get('hook1') as Hook[];
			expect(hooks.length).toBe(2);
			expect(hooks[0].name).toBe('listener1');
			expect(hooks[1].name).toBe('listener3');
		});

		it('should throw an error for unknown hooks', () => {

			const Hooks = new HookRegistry(BB);
			expect(() => Hooks.unregister('hook1', 'listener1')).toThrowError();
		});

		it('should throw an error if listener is not registered', async () => {

			const Hooks = new HookRegistry(BB);
			await Hooks.register('hook1', { name: 'listener1', handler: () => 'foo1' });

			expect(() => Hooks.unregister('hook1', 'listener2')).toThrowError();
		});

	});


	describe('.hasHook method', () => {

		it('should return true for a known hook', async () => {

			const Hooks = new HookRegistry(BB);
			await Hooks.register('hook1', { name: 'listener1', handler: () => 'foo1' });

			expect(Hooks.hasHook('hook1', 'listener1')).toBe(true);
		});

		it('should return false for an unknown hook', async () => {

			const Hooks = new HookRegistry(BB);
			await Hooks.register('hook1', { name: 'listener1', handler: () => 'foo1' });

			expect(Hooks.hasHook('hook1', 'listener2')).toBe(false);
		});

		it('should return false for an unknown event', async () => {

			const Hooks = new HookRegistry(BB);
			await Hooks.register('hook1', { name: 'listener1', handler: () => 'foo1' });

			expect(Hooks.hasHook('hook2', 'listener1')).toBe(false);
		});

	});

	describe('.createUniqueHookName method', () => {

		it('should create a different ID each time', async () => {

			const Hooks = new HookRegistry(BB);
			const n1 = Hooks.createUniqueHookName('foo');
			const n2 = Hooks.createUniqueHookName('foo');
			const n3 = Hooks.createUniqueHookName('foo');

			expect(n1 === n2).toBe(false);
			expect(n3 === n2).toBe(false);
			expect(n1 === n3).toBe(false);
		});

		it('should not return until a unique ID id found', async () => {

			// patch Math object
			let count = 0;
			const mockMath = Object.create(global.Math);
			mockMath.random = () => {
				count++;
				return (count > 3) ? 1 : 0.5;
			};
			global.Math = mockMath;


			const Hooks = new HookRegistry(BB);
			await Hooks.register('hook1', { handler: () => 'foo1' });
			await Hooks.register('hook1', { handler: () => 'foo1' });
			const hooks = Hooks.get('hook1') as Hook[];

			expect(hooks.length).toBe(2);
		});

	});


	describe('.run method', () => {

		it('should run a hook with no listeners', async () => {

			const Hooks = new HookRegistry(BB);

			const value = await Hooks.run('hook1', 20);
			expect(value).toBe(20);
		});

		it('should run a hook with a single listener', async () => {

			const Hooks = new HookRegistry(BB);
			await Hooks.register('hook1', { name: 'listener1', handler: (val: number) => val + 5 });

			const value = await Hooks.run('hook1', 20);
			expect(value).toBe(25);
		});

		it('should run a hook with a multiple listeners', async () => {

			const Hooks = new HookRegistry(BB);
			await Hooks.register('hook1', { name: 'return-self', handler: (val: number) => val });
			await Hooks.register('hook1', { name: 'add-five', handler: (val: number) => val + 5 });
			await Hooks.register('hook1', { name: 'add-ten', handler: (val: number) => val + 10 });

			const value = await Hooks.run('hook1', 2);
			expect(value).toBe(17);
		});

		it('should run a hook with a handler imported from ES module', async () => {

			const Hooks = new HookRegistry(BB);
			await Hooks.register('hook1', {
				handler: {
					__esModule: true,
					default: (val: number) => val + 5,
				},
				name: 'listener1',
			} as any);

			const value = await Hooks.run('hook1', 30);
			expect(value).toBe(35);
		});

		it('should run a hook with a handler imported from Promised ES module', async () => {

			const Hooks = new HookRegistry(BB);
			await Hooks.register('hook1', {
				handler: Promise.resolve({
					__esModule: true,
					default: (val: number) => val - 5,
				}),
				name: 'listener1',
			} as any);

			const value = await Hooks.run('hook1', 40);
			expect(value).toBe(35);
		});

		it('should run a hook with a handler imported from a Promise', async () => {

			const Hooks = new HookRegistry(BB);
			await Hooks.register('hook1', {
				handler: Promise.resolve((val: number) => val * 2),
				name: 'listener1',
			} as any);

			const value = await Hooks.run('hook1', 40);
			expect(value).toBe(80);
		});

		it('should run a hook with a handler imported from ES module (via BlueBaseModule)', async () => {

			const Hooks = new HookRegistry(BB);
			await Hooks.register('hook1', {
				handler: createBlueBaseModule({
					__esModule: true,
					default: (val: number) => val + 5,
				}),
				name: 'listener1',
			} as any);

			const value = await Hooks.run('hook1', 30);
			expect(value).toBe(35);
		});

		it('should run a hook with a handler imported from Promised ES module (via BlueBaseModule)', async () => {

			const Hooks = new HookRegistry(BB);
			await Hooks.register('hook1', {
				handler: createBlueBaseModule(Promise.resolve({
					__esModule: true,
					default: (val: number) => val + 5,
				}) as any),
				name: 'listener1',
			});

			const value = await Hooks.run('hook1', 40);
			expect(value).toBe(45);
		});

		it('should run a hook with a handler imported from a Promise (via BlueBaseModule)', async () => {

			const Hooks = new HookRegistry(BB);
			await Hooks.register('hook1', {
				handler: createBlueBaseModule(Promise.resolve((val: number) => val * 2) as any),
				name: 'listener1',
			});

			const value = await Hooks.run('hook1', 40);
			expect(value).toBe(80);
		});


		it('should run a hook with proper priorities', async () => {

			const Hooks = new HookRegistry(BB);
			await Hooks.register('hook1', { name: 'right', handler: async (val: string) => `${val} right!`, priority: 3 });
			await Hooks.register('hook1', { name: 'priorities', handler: (val: string) => `${val} priorities`, priority: 1 });
			await Hooks.register('hook1', { name: 'my', handler: async (val: string) => `${val}, my`, priority: 0 });
			await Hooks.register('hook1', { name: 'are', handler: (val: string) => `${val} are`, priority: 2 });

			const value = await Hooks.run('hook1', 'Hello ART');
			expect(value).toBe('Hello ART, my priorities are right!');
		});

		it('should run a hook even if a listener doesnt return any value', async () => {

			const Hooks = new HookRegistry(BB);
			await Hooks.register('hook1', { name: 'return-self', handler: (val: number) => val });
			await Hooks.register('hook1', { name: 'do-nothing', handler: () => { return; } });
			await Hooks.register('hook1', { name: 'add-five', handler: (val: number) => val + 5 });

			const value = await Hooks.run('hook1', 2);
			expect(value).toBe(7);
		});

		it('should run a hook even if a listener doesnt return a promise', async () => {

			const Hooks = new HookRegistry(BB);
			await Hooks.register('hook1', { name: 'return-self', handler: async (val: number) => val });
			await Hooks.register('hook1', { name: 'add-five', handler: (val: number) => val + 5 });
			await Hooks.register('hook1', { name: 'add-ten', handler: async (val: number) => val + 10 });

			const value = await Hooks.run('hook1', 2);
			expect(value).toBe(17);
		});

		it('should throw an error if handler is not a function', async () => {

			const Hooks = new HookRegistry(BB);
			await Hooks.register('hook1', { name: 'listener1', handler: 'foo1' } as any);

			let message = false;

			try {
				await Hooks.run('hook1', 2);
			} catch (e) {
				message = e.message;
			}

			expect(message).toBeTruthy();
		});

		it('should throw an error if handler ES Module is not a function', async () => {

			const Hooks = new HookRegistry(BB);
			await Hooks.register('hook1', { name: 'listener1', handler: { default: 'foo1', __esModule: true } } as any);

			let message = false;

			try {
				await Hooks.run('hook1', 2);
			} catch (e) {
				message = e.message;
			}

			expect(message).toBeTruthy();
		});

		it('should throw an error if handler Promised ES Module is not a function', async () => {

			const Hooks = new HookRegistry(BB);
			await Hooks.register('hook1', {
				handler: Promise.resolve({ default: 'foo1', __esModule: true }),
				name: 'listener1',
			} as any);

			let message = false;

			try {
				await Hooks.run('hook1', 2);
			} catch (e) {
				message = e.message;
			}

			expect(message).toBeTruthy();
		});

		it('should throw an error if handler Promise does not resolve a function', async () => {

			const Hooks = new HookRegistry(BB);
			await Hooks.register('hook1', {
				handler: Promise.resolve('foo1'),
				name: 'listener1',
			} as any);

			let message = false;

			try {
				await Hooks.run('hook1', 2);
			} catch (e) {
				message = e.message;
			}

			expect(message).toBeTruthy();
		});

	});
});