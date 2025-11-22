import * as format from 'N/format';
import type { NetsuiteCurrentRecord } from '../../Record';
import { FormattedDescriptor } from './FormattedDescriptor';

/**
 * DateTime formatter to automatically translate to/from Date objects and NS datetime strings
 * @param target
 * @param propertyKey
 * @returns
 */
export function DateTimeDescriptor<T extends NetsuiteCurrentRecord>(target: T, propertyKey: string): any {
	return FormattedDescriptor<T>(format.Type.DATETIME, target, propertyKey);
}
