/* @flow */
import RX from 'reactxp';

import { parseJsonSchema } from '../utils/JsonSchemaToReact';

const pageStyle = RX.Styles.createViewStyle({
	padding: 20,
	textAlign: 'center',
}, false);

const titleStyle = RX.Styles.createViewStyle({
	alignSelf: 'center',
	backgroundColor: 'rgba(0,123,255,1)',
	borderColor: 'rgba(0,123,255,1)',
	borderRadius: 10,
	borderWidth: 1,
	color: '#fff',
	fontSize: 68,
	marginBottom: 20,
	paddingLeft: 20,
	paddingRight: 20,
	shadowOffset: { height: 5, width: 0 },
	shadowRadius: 15,
	shadowColor: 'rgba(0,0,0,.3)'
}, false);

/**
 * Returns the main system layout view. This is the first view
 * of the layout heirarcy.
 *
 * @returns {React.Component} The layout react component
 */
export default function SystemLayout() : RX.Component<*> {
	const schema = {
		component: 'Page',
		props: { style: pageStyle },
		children: [{
			component: 'View',
			props: { style: titleStyle },
			children: [{
				component: 'Text',
				text: 'BR'
			}]
		}, {
			component: 'Text',
			text: 'Welcome to BlueRain OS!',
		}, {
			component: 'Link',
			props: {
				to: '/app/hello-world'
			},
			children: [{
				component: 'Text',
				text: 'Hello World App!',
			}]
		}]
	};

	return parseJsonSchema(schema);
}
