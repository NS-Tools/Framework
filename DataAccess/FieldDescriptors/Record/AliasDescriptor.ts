/*
* Copyright 2016-2025 Explore Consulting
* Copyright 2025-Present NS Tools Team
*
* See LICENSE file for additional information.
*/

import type { NetsuiteCurrentRecord } from '../../Record';

/**
 * Helper function to create an alias property that maps to another field id
 * Example usage @FieldType.alias('custentity_foo') foo: string
 *
 * @param fieldId
 * @returns any
 */
export function AliasDescriptor<T extends NetsuiteCurrentRecord>(fieldId: string) {
	return (target: T, propertyKey: string) => {
		Object.defineProperty(target, propertyKey, {
			get: function () {
				return this[fieldId];
			},
			set: function (value) {
				if (value === undefined) {
					return;
				}

				this[fieldId] = value;
			},
			enumerable: true,
			configurable: true,
		});
	};
}
