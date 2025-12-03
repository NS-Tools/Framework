/*
* Copyright 2016-2025 Explore Consulting
* Copyright 2025-Present NS Tools Team
*
* See LICENSE file for additional information.
*/

import type * as search from 'N/search';
import { nsSearchResult2obj } from '../search';

describe('nsSearchResult2obj', () => {
	/**
	 *
	 * @param colname column internal id
	 * @param label optional label for column
	 * @param value what value (getValue()) should the result have?
	 * @param text what text (getText()) value should the result have?
	 */
	function getFakeSearchResult(colname, label?, value?, text?): search.Result {
		return {
			id: '1',
			getValue: jest.fn().mockReturnValueOnce(value),
			getText: jest.fn().mockReturnValueOnce(text),
			recordType: 'recordType',
			columns: [
				{
					name: colname,
					label: label,
				},
			],
		} as any;
	}

	test('defaults to column name if label is undefined', () => {
		const noLabelResult = getFakeSearchResult('foo', undefined);
		// default useLabels
		const x = nsSearchResult2obj()(noLabelResult);
		expect(x).toHaveProperty('foo');
	});

	test('uses column label by default', () => {
		const labeledResult = getFakeSearchResult('foo', 'fooLabel');
		// default useLabels
		const x = nsSearchResult2obj()(labeledResult);
		expect(x).toHaveProperty('fooLabel');
	});

	test('uses column label if useLabels is true', () => {
		const labeledResult = getFakeSearchResult('foo', 'fooLabel');
		// explicitly set useLabels = true
		const x = nsSearchResult2obj(true)(labeledResult);
		expect(x).toHaveProperty('fooLabel');
	});

	test('uses column name if useLabels is false', () => {
		const labeledResult = getFakeSearchResult('foo', 'fooLabel');
		// default useLabels
		const x = nsSearchResult2obj(false)(labeledResult);
		expect(x).toHaveProperty('foo');
		expect(x).not.toHaveProperty('fooLabel');
	});

	test('does not generate xxxText field if text value is falsey', () => {
		const labeledResult = getFakeSearchResult('foo', 'fooLabel', 'value', undefined);
		// default useLabels
		const x = nsSearchResult2obj()(labeledResult);
		expect(x).toHaveProperty('fooLabel');
		expect(x).not.toHaveProperty('fooLabelText');
	});

	test('does not generate xxxText field if caller says not to', () => {
		const labeledResult = getFakeSearchResult('foo', 'fooLabel', 'value', 'foo text');
		// default useLabels, explicitly disable the xxxText property addition.
		const x = nsSearchResult2obj(true, false)(labeledResult);
		expect(x).toHaveProperty('fooLabel');
		expect(x).not.toHaveProperty('fooLabelText');
	});

	test('generates xxxText field if text value truthy', () => {
		const labeledResult = getFakeSearchResult('foo', 'fooLabel', 'value', 'value text');
		// default useLabels
		const x = nsSearchResult2obj()(labeledResult);
		expect(x).toHaveProperty('fooLabel', 'value');
		expect(x).toHaveProperty('fooLabelText', 'value text');
	});

	test('two column result generates xxxText field only if text value truthy', () => {
		const labeledResult = getFakeSearchResult('foo', 'fooLabel', 'value', 'value text');
		labeledResult.columns.push({ name: 'bar', label: undefined });

		// mock the second call to getValue() to return 5 (for the 'bar' property)
		const mockGetValue = labeledResult.getValue as jest.Mock;
		mockGetValue.mockReturnValueOnce(5);

		// default useLabels = true
		const x = nsSearchResult2obj()(labeledResult);
		expect(x).toHaveProperty('fooLabel', 'value');
		expect(x).toHaveProperty('fooLabelText', 'value text');
		expect(x).toEqual({
			id: '1',
			fooLabel: 'value',
			fooLabelText: 'value text',
			bar: 5,
			// note no 'barText' here
			recordType: 'recordType',
		});
	});

	test('handles search result with NO columns', () => {
		const noColumnsResult = getFakeSearchResult('foo', 'fooLabel', 'value', 'value text');
		// @ts-expect-error Error:(104, 14) TS2790: The operand of a 'delete' operator must be optional.
		delete noColumnsResult.columns;

		// mock the second call to getValue() to return 5 (for the 'bar' property)
		const mockGetValue = noColumnsResult.getValue as jest.Mock;
		mockGetValue.mockReturnValueOnce(5);

		const x = nsSearchResult2obj()(noColumnsResult);
		expect(x).toEqual({
			// id always there,  note no additional columns defined
			id: '1',
			// recordType is always present on search results
			recordType: 'recordType',
		});
	});
});
