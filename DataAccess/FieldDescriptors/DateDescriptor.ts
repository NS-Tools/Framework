import { NetsuiteCurrentRecord } from '../Record';
import { FormattedDescriptor } from './FormattedDescriptor';
import * as format from 'N/format';

/**
 * Date formatter to automatically translate to/from Date objects and NS date strings
 * 
 * @param target 
 * @param propertyKey 
 * @returns 
 */
export function DateDescriptor<T extends NetsuiteCurrentRecord> (target: T, propertyKey: string): any {
   return FormattedDescriptor<T>(format.Type.DATE, target, propertyKey);
}