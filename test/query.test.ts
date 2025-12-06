/*
* Copyright 2016-2025 Explore Consulting
* Copyright 2025-Present NS Tools Team
*
* See LICENSE file for additional information.
*/

import type * as query from 'N/query';
import { nsQueryResult2obj } from '../utility/query';

describe('nsQueryResult2obj', () => {
	function getFakeSearchResult(): query.Result {
		return {
			value: ['880'],
			asMap: jest.fn().mockReturnValueOnce({ foo: '880' }),
		} as any;
	}

	test('defaults to column name if label is undefined', () => {
		const noLabelResult = getFakeSearchResult();
		// default useLabels
		const x = nsQueryResult2obj(noLabelResult);
		expect(x).toHaveProperty('foo', '880');
	});
});
