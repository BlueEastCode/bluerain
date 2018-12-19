import { Button, Text } from '../index';
import { BlueBaseApp } from '../components/';
import React from 'react';
import TestRenderer from 'react-test-renderer';

// beforeEach(() => {
// 	jest.resetModules();
// });

describe('getComponent', () => {

	test(`should render a text component`, (done) => {
		const component = TestRenderer.create(
			<BlueBaseApp>
				<Text>A Text component</Text>
			</BlueBaseApp>
		);

		let tree = component.toJSON();
		expect((tree as any).children.join()).toBe('Loading');
		expect(tree).toMatchSnapshot();

		setTimeout(() => {
			tree = component.toJSON();
			expect((tree as any).children[0].type).toBe('Text');
			expect((tree as any).children[0].children.join()).toBe('A Text component');
			expect(tree).toMatchSnapshot();
			done();
		});
	});

	test(`should render a button component`, (done) => {
		const component = TestRenderer.create(
			<BlueBaseApp>
				<Button>A Button component</Button>
			</BlueBaseApp>
		);

		let tree = component.toJSON();
		expect((tree as any).children.join()).toBe('Loading');
		expect(tree).toMatchSnapshot();

		setTimeout(() => {
			tree = component.toJSON();
			expect((tree as any).children[0].type).toBe('View');
			expect(tree).toMatchSnapshot();
			done();
		});
	});

});