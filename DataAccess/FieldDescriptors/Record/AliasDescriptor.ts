/*
 * Copyright 2016-2025 Explore Consulting
 * Copyright 2025-Present NS Tools Team
 *
 * See LICENSE file for additional information.
 */

import type { NetsuiteCurrentRecord } from '../../Record';

/**
 * Helper field descriptor to create an alias property that maps to another field id
 * Example usage
 *
 * class Customer extends CustomerBase {
 *   @FieldType.freeformtext
 *   custentity1: string;
 * 	 // Field alias to access custentity1 via a friendlier more descriptive name
 *   @FieldType.alias('custentity1') my_descriptive_name: string;
 * }
 *
 * const customer = new Customer(123);
 * // set via alias, will update the Netsuite underlying field custentity1
 * customer.my_descriptive_name = 'Hello World';
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
