import { Analytics, Logger } from './api';
import {
	ComponentInputCollection,
	ComponentRegistry,
	ConfigCollection,
	ConfigRegistry,
	HookInputNestedCollection,
	HookRegistry,
	PluginInputCollection,
	PluginRegistry,
	ThemeInputCollection,
	ThemeRegistry,
} from './registries';
import { BlueBaseProvider } from './Context';
import { ComponentRegistryWithUIInterfaces as IComponentRegistry } from './ui-interfaces';
import React from 'react';
import { ThemeProvider } from './themes';
import systemHooks from './hooks';

export interface BootOptions {
	components: ComponentInputCollection,
	configs: ConfigCollection,
	hooks: HookInputNestedCollection,
	plugins: PluginInputCollection,
	themes: ThemeInputCollection,
	// routes: Plugin[]
}

export class BlueBase {

	// APIs
	public Analytics = new Analytics(this);
	public Logger = new Logger(this);

	// Registries
	public Components: IComponentRegistry = new ComponentRegistry(this) as IComponentRegistry;
	public Configs: ConfigRegistry = new ConfigRegistry(this);
	public Hooks: HookRegistry = new HookRegistry(this);
	public Plugins: PluginRegistry = new PluginRegistry(this);
	public Themes: ThemeRegistry = new ThemeRegistry(this);

	// Flags
	public booted = false;

	private bootOptions: BootOptions = {
		components: {},
		configs: {},
		hooks: {},
		plugins: [],
		themes: [],
	};

	public async boot(options?: Partial<BootOptions> & { children?: React.ReactNode }) {

		this.bootOptions = { ...this.bootOptions, ...options };

		await this.Hooks.registerNestedCollection(systemHooks);
		await this.Hooks.registerNestedCollection(this.bootOptions.hooks);

		await this.Hooks.run('bluebase.boot', this.bootOptions);

		// Set View
		// const SystemApp = this.Components.resolve('SystemApp');
		// SystemApp = await this.Hooks.run('bluebase.system.app', SystemApp);

		const BlueBaseRoot = () => (
			<BlueBaseProvider value={this}>
				<ThemeProvider>
					<this.Components.SystemApp>
						{options && options.children}
					</this.Components.SystemApp>
				</ThemeProvider>
			</BlueBaseProvider>
		);

		this.booted = true;

		return BlueBaseRoot;
	}
}