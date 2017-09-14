'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _reactxp = require('reactxp');

var _reactxp2 = _interopRequireDefault(_reactxp);

var _src = require('../../../bluerain-os/src');

var _src2 = _interopRequireDefault(_src);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styleView = _reactxp2.default.Styles.createViewStyle({
	padding: 20,
	width: '100%',
	height: '100%',
	textAlign: 'center'
});

var sizeText = _reactxp2.default.Styles.createViewStyle({
	fontSize: 70,
	paddingBottom: 10,
	paddingTop: 10,
	fontWeight: 600,
	color: 'rgba(255,255,255,1)'
});

var subtitleText = _reactxp2.default.Styles.createViewStyle({
	fontSize: 18,
	paddingBottom: 5,
	paddingTop: 5,
	color: 'rgba(255,255,255,1)'
});

var descriptionText = _reactxp2.default.Styles.createViewStyle({
	fontSize: 14,
	paddingBottom: 5,
	paddingTop: 5,
	color: 'rgba(255,255,255,.5)'
});

var pageContent = function pageContent(size) {
	var title = void 0;
	var bg = void 0;

	switch (size) {
		case 'xs':
			title = 'Extra Small';
			bg = '#007bff';
			break;
		case 'sm':
			title = 'Small';
			bg = '#28a745';
			break;
		case 'md':
			title = 'Medium';
			bg = '#dc3545';
			break;
		case 'lg':
			title = 'Large';
			bg = '#17a2b8';
			break;
		case 'xl':
			title = 'Extra Large';
			bg = '#868e96';
			break;
		default:
			break;
	}

	var subtitle = title + ' Layout';
	var description = 'Try changing browser window width to see the layout change.';

	return _src2.default.Utils.parseJsonSchema({
		component: 'View',
		props: {
			style: [styleView, _reactxp2.default.Styles.createViewStyle({ backgroundColor: bg }, false)]
		},
		children: [{
			component: 'Text',
			props: { style: sizeText },
			text: size
		}, {
			component: 'Text',
			props: { style: subtitleText },
			text: subtitle
		}, {
			component: 'Text',
			props: { style: descriptionText },
			text: description
		}]
	});
};

exports.default = function (_ref) {
	var match = _ref.match,
	    appName = _ref.appName;

	var layout = {
		component: 'ResponsiveLayout',
		props: {
			default: function _default() {
				return pageContent('default');
			},
			xs: function xs() {
				return pageContent('xs');
			},
			sm: function sm() {
				return pageContent('sm');
			},
			md: function md() {
				return pageContent('md');
			},
			lg: function lg() {
				return pageContent('lg');
			},
			xl: function xl() {
				return pageContent('xl');
			}
		}
	};

	// const WindowInfo = PluginRegistry.get('window-info');
	// return WindowInfo.withWindowInfo(BR.Utils.parseJsonSchema(layout));
	return _src2.default.Utils.parseJsonSchema(layout);
};