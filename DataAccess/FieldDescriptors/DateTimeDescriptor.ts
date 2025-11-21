import { NetsuiteCurrentRecord } from '../Record';
import { FormattedDescriptor } from './FormattedDescriptor';
import * as format from 'N/format';

/**
 * DateTime formatter to automatically translate to/from Date objects and NS datetime strings
 * @param target 
 * @param propertyKey 
 * @returns 
 */
export function DateTimeDescriptor<T extends NetsuiteCurrentRecord> (target: T, propertyKey: string): any {
   return FormattedDescriptor<T>(format.Type.DATETIME, target, propertyKey);
}