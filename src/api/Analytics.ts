import { BlueBase } from '../BlueBase';


export interface AnalyticTrackData {

	/** Event name */
	name: string,

	/**
	 * The attributes of the event. Some analytics platfomrs use these attributes
	 * as selection criteria when you create a segment.
	 */
	attributes?: { [key: string]: string },

	/** Custom metrics that your app reports to analytics providers (i.e. AWS Pinpoint) */
	metrics?: { [key: string]: number },

	[key: string]: any,
}

/**
 * 📈 Analytics API
 */
export class Analytics {

	constructor(private BB: BlueBase) {
		//
	}

	public track(data: AnalyticTrackData) {
		this.BB.Hooks.run('bluebase.analytics.track', data);
	}
}