/*
 * Copyright 2016-2025 Explore Consulting
 * Copyright 2025-Present NS Tools Team
 *
 * See LICENSE file for additional information.
 */

import * as LogManager from '../../../utility/Logger';
import { parseProp } from '../../Helpers';
import type { NetsuiteCurrentRecord } from '../../Record';

const log = LogManager.getLogger('DataAccess.Record');

/**
 * Just like the default descriptor but calls Number() on the value. This exists for numeric types that
 * would blow up if you tried to assign number primitive values to a field. Don't know why - did various checks
 * with lodash and typeof to confirm the raw value was a number but only passing through Number() worked on sets.
 * Reads still seem to return a number.
 * @returns an object property descriptor to be used
 * with Object.defineProperty
 */
export function NumericDescriptor<T extends NetsuiteCurrentRecord>(_target: T, propertyKey: string): any {
	const [isTextField, nsfield] = parseProp(propertyKey);
	return {
		get: function () {
			return isTextField ? this.nsrecord.getText({ fieldId: nsfield }) : this.nsrecord.getValue({ fieldId: nsfield });
		},
		set: function (value) {
			// ignore undefined's
			if (value !== undefined) {
				if (isTextField) this.nsrecord.setText({ fieldId: nsfield, text: value });
				else this.nsrecord.setValue({ fieldId: nsfield, value: Number(value) });
			} else log.info(`ignoring field [${propertyKey}]`, 'field value is undefined');
		},
		enumerable: true, //default is false
	};
}
