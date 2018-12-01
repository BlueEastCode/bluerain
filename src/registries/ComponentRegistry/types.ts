import { BlueBaseModule, MaybeBlueBaseModule, MaybeThunk } from '../../utils';
import { ComponentStyles } from '../../models';
import React from 'react';

/////////////////////////////////////
/////// ComponentRegistryItem ///////
/////////////////////////////////////

/**
 * Definition of the HOC
 */
export type ComponentRegistryHocItem = (...args: any[]) => React.ComponentType<any>;

/**
 * Source of this component. Contains information about who registered this component.
 */
export interface ComponentSource {
	type: 'plugin' | 'api' | 'custom';
	slug: string;
}


export interface ComponentRegistryItemBase {
	hocs: ComponentRegistryHocItem[];
	source?: ComponentSource;

	styles?: MaybeThunk<ComponentStyles>;
	isAsync: boolean;
	preload: boolean;
}

export interface ComponentRegistryItem extends ComponentRegistryItemBase {
	rawComponent: BlueBaseModule<React.ComponentType<any>>;
}

export interface ComponentRegistryItemInternal extends Partial<ComponentRegistryItemBase> {
	rawComponent: MaybeBlueBaseModule<React.ComponentType<any>>;
}

/**
 * Input type when registering a component
 */
export type ComponentInput =
	ComponentRegistryItemInternal |
	MaybeBlueBaseModule<React.ComponentType<any>>;

export interface ComponentCollectionInput {
	[key: string]: ComponentInput
}
