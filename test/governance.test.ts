/*
* Copyright 2016-2025 Explore Consulting
* Copyright 2025-Present NS Tools Team
*
* See LICENSE file for additional information.
*/

// mock must be declared at top of file because ts-jest uses babel to auto-hoist and it was erroring all tests
// import * as mockrecord from "../__mocks__/N/record"

import * as mockruntime from '../__mocks__/N/runtime';
import * as mocktask from '../__mocks__/N/task';
import { governanceRemains, rescheduleIfNeeded } from '../utility/governance';

describe('governance', () => {
	const getRemainingUsage = mockruntime.getCurrentScript().getRemainingUsage;

	test('time and units remain returns true', () => {
		getRemainingUsage.mockReturnValue(1000);
		const sut = governanceRemains();
		expect(sut()).toEqual(true);
	});

	test('drop below units threshold returns false', () => {
		getRemainingUsage.mockReturnValue(199);
		const sut = governanceRemains();

		expect(sut()).toEqual(false);
	});

	test('drop below time threshold returns false', () => {
		getRemainingUsage.mockReturnValue(1000);
		// simulate a start time 46 minutes in the past
		const fortySixMinutesAgo = getPastEpoch(46);

		const sut = governanceRemains(fortySixMinutesAgo);

		expect(sut()).toEqual(false);
	});

	test('drop below time threshold and units returns false', () => {
		getRemainingUsage.mockReturnValue(100);
		// simulate a start time 46 minutes in the past
		const fortySixMinutesAgo = getPastEpoch(46);

		const sut = governanceRemains(fortySixMinutesAgo);

		expect(sut()).toEqual(false);
	});

	test('time remains should return true', () => {
		getRemainingUsage.mockReturnValue(1000);
		// simulate a start time 30 minutes in the past - still has 15 minutes of time before the default 45 min limit
		const inThePast = getPastEpoch(30);

		const sut = governanceRemains(inThePast);

		expect(sut()).toEqual(true);
	});
});

describe('rescheduling', () => {
	test('should not reschedule if governance remains (no parms)', () => {
		const alwaysTrue = () => true;

		const sut = rescheduleIfNeeded(alwaysTrue);

		expect(sut()).toEqual(true);
		expect(mocktask.create).not.toHaveBeenCalled();
	});

	test('does not reschedule if governance exhausted (no parms)', () => {
		const alwaysFalse = () => false;

		const sut = rescheduleIfNeeded(alwaysFalse);

		expect(sut()).toEqual(false);
		expect(mocktask.create).toHaveBeenCalled();
	});

	test('passes script params when rescheduling', () => {
		const alwaysFalse = () => false;

		const scriptParams = { foo: 'bar' };
		const sut = rescheduleIfNeeded(alwaysFalse, scriptParams);

		expect(sut()).toEqual(false);
		// task.create() is called with our script params
		expect(mocktask.create.mock.calls[0][0]).toEqual(expect.objectContaining({ params: scriptParams }));
	});

	test('passes callback script params when rescheduling (supersedes params:object parameter)', function () {
		const alwaysFalse = () => false
		let scriptParams = { foo: 'bar' }
		const makeScriptParams = () =>  scriptParams
		const sut = rescheduleIfNeeded( alwaysFalse, undefined, () => makeScriptParams() )
		expect(sut()).toEqual(false)
		// task.create() is called with our script params
		expect(JSON.stringify(mocktask.create.mock.calls[0][0].params)).toEqual( JSON.stringify(scriptParams) )
	});

	test('passes params to callback script when rescheduling (supersedes params:object parameter)', function () {
		const alwaysFalse = () => false
		let scriptParams = { foo: 'bar' }
		const makeScriptParams = (params) => {
			return params;
		}
		const sut = rescheduleIfNeeded( alwaysFalse, undefined, () => makeScriptParams(scriptParams) )
		expect(sut()).toEqual(false)
		// task.create() is called with our script params
		expect(JSON.stringify(mocktask.create.mock.calls[0][0].params)).toEqual( JSON.stringify(scriptParams) )
	});

	test('passes params to callback script and receives modified params back while rescheduling (supersedes params:object parameter)', function () {
		const alwaysFalse = () => false
		let scriptParams = { foo: 'bar' }
		const makeScriptParams = (params) => {
			params.foo = 'baz';
			return params;
		}
		const sut = rescheduleIfNeeded( alwaysFalse, undefined, () => makeScriptParams(scriptParams) )
		expect(sut()).toEqual(false)
		// task.create() is called with our script params
		expect(JSON.stringify(mocktask.create.mock.calls[0][0].params)).toEqual( JSON.stringify({ foo: 'baz' }) )
	});
});

function getPastEpoch(minutes: number): number {
	const epoch = Date.now();
	return epoch - minutes * 60 * 1000;
}
