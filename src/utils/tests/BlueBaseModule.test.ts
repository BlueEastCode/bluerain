import { createBlueBaseModule, getDefiniteBlueBaseModule } from '../BlueBaseModule';

describe('Utils', () => {
	describe('BlueBaseModule', () => {
		it('should process a CommonJS module', async () => {
			const module = createBlueBaseModule({ foo: 'bar' });
			expect(module.loaded).toBe(false);

			const obj = await module;
			expect(obj.foo).toBe('bar');
			expect(module.loaded).toBe(true);
		});

		it('should process an ES module', async () => {
			const module = createBlueBaseModule<{ foo: string }>({
				__esModule: true,
				default: { foo: 'bar' },
			} as any);
			expect(module.loaded).toBe(false);

			const obj = await module;
			expect(obj.foo).toBe('bar');
			expect(module.loaded).toBe(true);
		});

		it('should process a CommonJS module in a promise', async () => {
			const module = createBlueBaseModule<{ foo: string }>(Promise.resolve({ foo: 'bar' }) as any);
			expect(module.loaded).toBe(false);

			const obj = await module;
			expect(obj.foo).toBe('bar');
			expect(module.loaded).toBe(true);
		});

		it('should process an ES module in a promise', async () => {
			const module = createBlueBaseModule<{ foo: string }>(
				Promise.resolve({
					__esModule: true,
					default: { foo: 'bar' },
				}) as any
			);
			expect(module.loaded).toBe(false);

			const obj = await module;
			expect(obj.foo).toBe('bar');
			expect(module.loaded).toBe(true);
		});

		it('.getDefiniteBlueBaseModule method should return a BlueBaseModule object as is', async () => {
			const module = createBlueBaseModule({ foo: 'bar' });
			expect(getDefiniteBlueBaseModule(module)).toBe(module);
		});

		it('.getDefiniteBlueBaseModule method should create a BlueBaseModule object', async () => {
			const module = getDefiniteBlueBaseModule<{ foo: string }>({ foo: 'bar' });

			const obj = await module;
			expect(obj.foo).toBe('bar');
		});

		it('should set loaded prop of only the loaded item', () => {
			const module = createBlueBaseModule({ foo: 'bar' });
			const module1 = createBlueBaseModule({ foo: 'baz' });
			expect(module.loaded).toBe(false);
			expect(module1.loaded).toBe(false);

			module.then(obj => {
				expect(obj.foo).toBe('bar');
				expect(module.loaded).toBe(true);
			});
			expect(module1.loaded).toBe(false);
		});
	});
});
