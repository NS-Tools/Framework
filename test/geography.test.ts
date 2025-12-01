/*
* Copyright 2016-2025 Explore Consulting
* Copyright 2025-Present NS Tools Team
*
* See LICENSE file for additional information.
*/

/**
 * Basic tests for geographic info (states and countries)
 */

import { getCountryById, getCountryByUniqueKey, getStateById, getStateByShortName } from '../geography';

describe('get states info', () => {
	test('get WA by id', () => {
		const foundstate = getStateById(48);
		expect(foundstate).toHaveProperty('shortname', 'WA');
	});

	test('get unknown state by id', () => {
		const foundState = getStateById('');
		expect(foundState).toBeUndefined();
	});

	test('get WA by valid short name', () => {
		const foundstate = getStateByShortName('WA');
		expect(foundstate).toHaveProperty('shortname', 'WA');
	});

	test('get unknown state by invalid short name', () => {
		const foundstate = getStateByShortName('washington');
		expect(foundstate).toBeUndefined();
	});
});

describe('get country info', () => {
	test('get USA by id', () => {
		const foundCountry = getCountryById('US');
		expect(foundCountry).toHaveProperty('name', 'United States');
	});

	test('get unknown country by id', () => {
		const foundCountry = getCountryById('no such country code exists');
		expect(foundCountry).toBeUndefined();
	});

	test('get country by uniquekey', () => {
		const foundCountry = getCountryByUniqueKey(3);
		expect(foundCountry).toHaveProperty('id', 'AF');
	});

	test('get unknown country by uniquekey', () => {
		const foundCountry = getCountryByUniqueKey(-1);
		expect(foundCountry).toBeUndefined();
	});
});
