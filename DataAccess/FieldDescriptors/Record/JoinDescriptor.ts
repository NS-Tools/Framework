/*
* Copyright 2016-2025 Explore Consulting
* Copyright 2025-Present NS Tools Team
*
* See LICENSE file for additional information.
*/

import * as LogManager from '../../../EC_Logger';
import type { NetsuiteCurrentRecord } from '../../Record';

const log = LogManager.getLogger('DataAccess.Record');

/**
 * Helper decorator to define a join relationship to another record type.
 * Example usage:
 * @FieldType.join('entity', Customer) customer: Customer
 *
 * @param fieldId
 * @param classReference
 * @returns NCurrentRecord
 */
export function JoinDescriptor<T extends NetsuiteCurrentRecord>(fieldId: string, classReference: any) {
	return (target: T, propertyKey: string) => {
		const privateInstanceKey = `__join_${fieldId}`;

		Object.defineProperty(target, propertyKey, {
			get: function () {
				if (!this[privateInstanceKey]) {
					try {
						Object.defineProperty(this, privateInstanceKey, {
							value: new classReference(this.nsrecord.getValue({ fieldId: fieldId })),
							writable: true,
							enumerable: false,
							configurable: true,
						});
					} catch (_e) {
						this[privateInstanceKey] = new classReference(this.nsrecord.getValue({ fieldId: fieldId }));
					}
				}

				return this[privateInstanceKey] ? this[privateInstanceKey] : null;
			},
			set: function (value) {
				if (value === undefined) {
					log.debug(`ignoring field [${fieldId}]`, 'field value is undefined');
					return;
				}

				if (value instanceof classReference) {
					this[fieldId] = value.id;
				} else {
					this[fieldId] = value;
				}

				delete this[privateInstanceKey];
			},
			enumerable: true,
			configurable: true,
		});
	};
}
