import { HookRegistry } from './registries';
import { Logger } from './api';

export class BlueRain {

	// APIs
	public Logger = new Logger(this);

	// Registries
	public Hooks: HookRegistry<BlueRain> = new HookRegistry(this as BlueRain);
}