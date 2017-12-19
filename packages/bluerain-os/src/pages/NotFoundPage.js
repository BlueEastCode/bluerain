/* @flow */
import { parseJsonSchema } from '../utils/JsonSchemaToReact';
import  createStyleSheet  from '../utils/createStyleSheet';

const pageStyle = createStyleSheet({
	justifyContent: 'center',
	padding: 20,
}, 'View');

const titleStyle = createStyleSheet({
	alignSelf: 'center',
	textAlign: 'center',
	backgroundColor: 'rgb(220,53,69)',
	borderColor: 'rgb(220,53,69)',
	borderRadius: 10,
	borderWidth: 1,
	color: '#fff',
	fontSize: 68,
	marginBottom: 20,
	padding: 20,
	shadowOffset: { height: 5, width: 0 },
	shadowRadius: 15,
	shadowColor: 'rgba(0,0,0,.3)'
}, 'Text');

const subTitleStyle = createStyleSheet({
	textAlign: 'center',
	color: 'rgb(150, 150, 150)',
	marginBottom: 20,
	overflow: 'initial'
}, 'Text');

/**
 * Returns the 404 Page layout.
 *
 * @returns {React.Component} The layout react component
 */
export default () => {
	const schema = {
		component: 'Page',
		props: { style: pageStyle },
		children: [{
			component: 'View',
			children: [{
				props: { style: titleStyle },
				component: 'Text',
				text: '404'
			}]
		}, {
			component: 'Text',
			props: { style: subTitleStyle },
			text: 'Page not found!',
		}]
	};

	return parseJsonSchema(schema);
};
