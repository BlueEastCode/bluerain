import { PluginIcon } from '../PluginIcon';
import React from 'react';
import TestRenderer from 'react-test-renderer';
import WithProvider from '../../../testing/helpers/WithProvider';


describe('PluginIcon', () => {
	beforeEach(() => {
		jest.resetModules();
	});
	const PluginIconWithProvider = (props: any) => (
		<WithProvider>
			<PluginIcon {...props} />
		</WithProvider>
	);

	it(`Snapshot PluginIcon component with no plugin registered`, () => {

		const component = TestRenderer.create(
			<PluginIconWithProvider slug="unregistered-plugin" />
		);
		try {
			const tree = component.toJSON();
			expect(tree).toMatchSnapshot();
		} catch (e) {
			expect(e.message).toBe(`There's no pluign registered with "unregistered-plugin" key in the registry.`);
		}
	});

	it(`Snapshot PluginIcon component with plugin registered with icon`, () => {

		const component = TestRenderer.create(
			<PluginIconWithProvider slug="dummy-plugin" />
		);
		const tree = component.toJSON();
		expect(tree).toMatchSnapshot();
	});

});