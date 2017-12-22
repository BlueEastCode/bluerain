import React from 'react';
import BR, { App } from '../../src';
import { Map } from 'immutable';
class HelloApp extends App {
	static appName = 'Hello World';
	render() {
		return <div>hello world</div>;
	}
}

describe('App registry tests', () => {
	it('App should be defined', () => {
		expect(HelloApp).toBeDefined();
	});

  // tests for registering apps
	describe('register app', () => {
		it('should throw error b/c appname is not given', () => {
			class HelloAppWithoutName extends App {
				render() {
					return <div>hello world</div>;
				}
      }
			expect(() => BR.Apps.set(HelloAppWithoutName)).toThrow(
        'App name not provided.'
      );
		});
		it('slug should be abc-app', () => {
			class TestApp extends App {
				static appName = 'Hello World';
				static slug = 'abc-app';
				render() {
					return <div>hello world</div>;
				}
      }
			BR.Apps.set(TestApp);
			expect(
        BR.Apps.data.has('abc-app')
      ).toEqual(true);
			expect(BR.Apps.data.get('abc-app').slug).toEqual('abc-app');
		});
		it('slug should be hello-world', () => {
			BR.Apps.set(HelloApp);
			expect(
          BR.Apps.data.has('hello-world')
      ).toEqual(true);
			expect(BR.Apps.data.get('hello-world').slug).toEqual('hello-world');
		});
		it('should throw error b/c name is undefined', () => {
			expect(() => BR.Apps.set(undefined)).toThrow();
		});
		it('should throw error b/c App name is no given', () => {
			class HelloAppNOName extends App {
				render() {
					return <div>hello world</div>;
				}
      }
			expect(() => BR.Apps.set(HelloAppNOName)).toThrow();
		});
		it('should throw error b/c name is null', () => {
			expect(() => BR.Apps.set(null)).toThrow();
		});
		it('slug Create other recognized static properties', () => {
			const app = BR.Apps.data.get('hello-world');
			expect(app.slug).toEqual('hello-world');
			expect(app.path).toEqual('/app/hello-world');
			expect(app.appRoutePrefix).toEqual('/app');
		});
	});

  // tests for creating app by using React.component
	describe('Tests for app by extending React Component', () => {
		class HelloReactApp extends React.Component {
			static appName = 'Hello React World';
			render() {
				return <div>hello world</div>;
			}
    }
		it('App should be defined', () => {
			expect(HelloReactApp).toBeDefined();
		});
		it('should throw error b/c appname is not given', () => {
			class HelloAppWithoutName extends React.Component {
				render() {
					return <div>hello world</div>;
				}
      }
			expect(() => BR.Apps.set(HelloAppWithoutName)).toThrow(
        'App name not provided.'
      );
		});
		it('slug should be abc-react-app', () => {
			class TestApp extends React.Component {
				static appName = 'Hello World';
				static slug = 'abc-react-app';
				render() {
					return <div>hello world</div>;
				}
      }
			BR.Apps.set(TestApp);
			expect(
          BR.Apps.data.has('abc-react-app')
      ).toEqual(true);
			expect(BR.Apps.data.get('abc-react-app').slug).toEqual(
        'abc-react-app'
      );
		});
		it('slug should be hello-react-world', () => {
			BR.Apps.set(HelloReactApp);
			expect(BR.Apps.data.has('hello-react-world')).toEqual(true);
			expect(BR.Apps.data.get('hello-react-world').slug).toEqual(
        'hello-react-world'
      );
		});
		it('slug Create other recognized static properties', () => {
			const app = BR.Apps.data.get('hello-react-world');
			expect(app.slug).toEqual('hello-react-world');
			expect(app.path).toEqual('/app/hello-react-world');
			expect(app.appRoutePrefix).toEqual('/app');
		});
	});

  // tests for creating app stateless function.
	describe('Tests for by creating a stateless functional react component', () => {
		const HellostatelessApp = () => <div>hello world</div>;
		HellostatelessApp.appName = 'Hello stateless app';
		it('App should be defined', () => {
			expect(HellostatelessApp).toBeDefined();
		});
		it('should throw error b/c appname is not given', () => {
			const HelloAppWithoutName = () => <div>hello world</div>;
			expect(() => BR.Apps.set(HelloAppWithoutName)).toThrow(
        'App name not provided.'
      );
		});
		it('slug should be abc-stateless-app', () => {
			const TestApp = () => <div>hello world</div>;
			TestApp.appName = 'Hello World';
			TestApp.slug = 'abc-stateless-app';
			BR.Apps.set(TestApp);
			expect(BR.Apps.data.has('abc-stateless-app')).toEqual(true);
			expect(BR.Apps.data.get('abc-stateless-app').slug).toEqual(
        'abc-stateless-app'
      );
		});
		it('slug should be hello-stateless-app', () => {
			BR.Apps.set(HellostatelessApp);
			expect(
          BR.Apps.data.has('hello-stateless-app')
      ).toEqual(true);
			expect(BR.Apps.data.get('hello-stateless-app').slug).toEqual(
        'hello-stateless-app'
      );
		});
		it('slug Create other recognized static properties', () => {
			const app = BR.Apps.data.get('hello-stateless-app');
			expect(app.slug).toEqual('hello-stateless-app');
			expect(app.path).toEqual('/app/hello-stateless-app');
			expect(app.appRoutePrefix).toEqual('/app');
		});
	});
	describe('all apps', () => {
		it('return all apps', () => {
			expect(BR.Apps.data.count()).toEqual(6);
		});
	});
	describe('initialize apps', () => {
		it('should initialize all apps', () => {
			class HelloReactApp extends App {
				static appName = 'Hello React World';
				render() {
					return <div>hello world</div>;
				}
				static initialize() {}
      }
			BR.Apps.replace('hello-react-world', HelloReactApp);
			BR.Apps.initializeAll();
		});
	});
	describe('remove app', () => {
		it('should throw error b/c name is undefined', () => {
			expect(() => BR.Apps.remove(undefined)).toThrow();
		});
		it('should throw error b/c name is null', () => {
			expect(() => BR.Apps.remove(null)).toThrow();
		});
		it('should throw error b/c app is not registered.', () => {
			expect(() => BR.Apps.remove('abc')).toThrow();
		});
		it('should have App with slug', () => {
			BR.Apps.remove('hello-react-world');
			expect(BR.Apps.data.has('hello-react-world')).toEqual(
        false
      );
		});
		it('should have Apps', () => {
			BR.Apps.remove('hello-world');
			expect(BR.Apps.data.has('hello-world')).toEqual(
        false
			);
			BR.Apps.data = Map();
		});
	});

	describe('register many app', () => {
		it('should throw error b/c app is not array', () => {
			expect(() => BR.Apps.registerMany({})).toThrow();
		});
		it('should be empty', () => {
			BR.Apps.registerMany();
			expect(BR.Apps.data.count()).toEqual(0);
		});
		it('should throw error b/c errornous apps', () => {
			expect(() => BR.Apps.registerMany(['string', {}])).toThrow('App name not provided.');
		});
		it('should have hello world app', () => {
			class TestApp extends React.Component {
				static appName = 'Hello World';
				static slug = 'abc-react-app';
				render() {
					return <div>hello world</div>;
				}
            }
			BR.Apps.registerMany([HelloApp, TestApp]);
			expect(BR.Apps.data.count()).toEqual(2);
		});
	});

	describe('initialize apps', () => {
		it('should initialize all apps', () => {
			BR.Configs.set('apps.hello-react-world', '3');
			class HelloReactApp extends App {
				static appName = 'Hello React World';
				render() {
					return <div>hello world</div>;
				}
				static initialize(config) {
					BR.Filters.set('test.initialize.hook', function abc() { return config + 34; });
				}
       }
			BR.Apps.set(HelloReactApp);
			BR.Apps.initializeAll();
			expect(BR.Filters.run('test.initialize.hook')).toEqual('334');
		});
	});
	describe('get component schema', () => {
		it('should throw error b/c app is not array', () => {
			const schema = BR.Apps.getComponentSchema();
			expect(schema[0].props.path).toEqual('/app/hello-world');
		});
	});
});
