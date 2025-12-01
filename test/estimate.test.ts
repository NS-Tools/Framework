/*
* Copyright 2016-2025 Explore Consulting
* Copyright 2025-Present NS Tools Team
*
* See LICENSE file for additional information.
*/

import { EstimateBase } from '../DataAccess/BaseRecords/EstimateBase';
import { Sublist } from '../DataAccess/Sublist';

describe('extimate', () => {
	test('sublists exist', () => {
		const sut = new EstimateBase();

		// should have an 'item' sublist and 'expense' sublist
		expect(sut.item).toBeInstanceOf(Sublist);
	});

	test('spot check fields', () => {
		const sut = new EstimateBase();

		expect(sut.balance).toBeUndefined();
	});
});
