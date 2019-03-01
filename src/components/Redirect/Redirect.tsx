import { NavigationActions } from '../../getComponent';
import { NavigationParams } from '../NavigationActions';
import React from 'react';

export interface RedirectProps {
	routeName?: string,
	path?: string,
	params?: NavigationParams;
	push?: boolean,
}

/**
 * 🔀 Redirect
 */
export const Redirect = (props: RedirectProps) => {

	const { routeName, path, params, push } = props;

	return (
		<NavigationActions>
			{({ push: pushFn, replace }) => {

				const fn = (push === true) ? pushFn : replace;

				if (typeof routeName === 'string') {
					fn(routeName, params);
				}
				else if (typeof path === 'string') {
					fn({ path }, params);
				}

				return null;
			}}
		</NavigationActions>
	);
};

Redirect.defaultProps = {
	push: false,
};
