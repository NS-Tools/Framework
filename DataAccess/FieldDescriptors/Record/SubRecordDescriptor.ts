import type * as record from 'N/record';
import type { NetsuiteCurrentRecord } from '../../Record';

/**
 * Decorator for *subrecord* fields with the subrecord shape represented by T (which
 * defines the properties you want on the subrecord)
 * @param ctor Constructor for the type that has the properties you want from the subrecord.
 * e.g. AssemblyBuild.InventoryDetail
 */
export function SubRecordDescriptor<T extends NetsuiteCurrentRecord>(ctor: new (rec: record.Record) => T) {
	return (target: any, propertyKey: string): any => ({
		enumerable: true,
		// sublist is read only for now - if we have a use case where this should be assigned then tackle it
		get: function () {
			return new ctor(
				this.nsrecord.getSubrecord({
					fieldId: propertyKey,
				}),
			);
		},
	});
}
