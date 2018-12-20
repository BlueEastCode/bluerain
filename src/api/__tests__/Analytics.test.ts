// tslint:disable:object-literal-sort-keys

import { AnalyticTrackData } from '../Analytics';
import { BlueBase } from '../../BlueBase';

describe('Analytics', () => {
	it('should send track data through hook', async () => {
		const BB = new BlueBase();
		const testData: AnalyticTrackData = {
			name: 'click',
			attributes: {
				genre: 'music',
			},
			metrics: {
				foo: 1,
				bar: 2,
			},
		};

		await BB.Hooks.register({
			key: 'analytics-test',
			event: 'bluebase.analytics.track',
			value: (data: AnalyticTrackData) => {
				expect(data).toMatchObject(testData);
			},
		});

		BB.Analytics.track(testData);
	});
});
