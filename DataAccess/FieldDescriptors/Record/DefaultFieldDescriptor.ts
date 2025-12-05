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
 * Generic decorator factory with basic default algorithm that exposes the field value directly with no
 * other processing. If the property name ends with "Text" then the property will use getText()/setText()
 *
 * @returns a decorator that returns a property descriptor to be used
 * with Object.defineProperty
 */
export function DefaultFieldDescriptor<T extends NetsuiteCurrentRecord>(target: T, propertyKey: string): any {
	const [isTextField, nsfield] = parseProp(propertyKey);
	return {
		get: function () {
			log.debug('field GET', `${nsfield}, as text:${isTextField}`);
			return isTextField ? this.nsrecord.getText({ fieldId: nsfield }) : this.nsrecord.getValue({ fieldId: nsfield });
		},
		set: function (value) {
			// ignore undefined's
			if (value !== undefined) {
				if (isTextField) this.nsrecord.setText({ fieldId: nsfield, text: value });
				else this.nsrecord.setValue({ fieldId: nsfield, value: value });
			} else log.info(`ignoring field [${propertyKey}]`, 'field value is undefined');
		},
		enumerable: true, //default is false
	};
}
