/*
* Copyright 2016-2025 Explore Consulting
* Copyright 2025-Present NS Tools Team
*
* See LICENSE file for additional information.
*/

import type { NetsuiteCurrentRecord } from "DataAccess/Record";
import type * as record from 'N/record';
import type { SublistLine } from '../../Sublist';

/**
 * Decorator for sublist *subrecord* fields with the subrecord shape represented by T (which
 * defines the properties you want on the subrecord)
 * @param ctor Constructor for the subrecord class you want (e.g. `AddressBase`, `InventoryDetail`).
 */
export function SubRecordDescriptor<T extends NetsuiteCurrentRecord>(
	ctor: new (rec: Omit<record.Record, 'save'>) => T,
) {
	return (target: any, propertyKey: string): any => ({
		enumerable: true,
		// sublist is read-only for now - if we have a use case where this should be assigned then tackle it
		get: function (this: SublistLine) {
			return new ctor(this.getSubRecord(propertyKey));
		},
	});
}