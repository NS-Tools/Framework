/*
* Copyright 2016-2025 Explore Consulting
* Copyright 2025-Present NS Tools Team
*
* See LICENSE file for additional information.
*/

import * as format from 'N/format';
import type { NetsuiteCurrentRecord } from '../../Record';
import { FormattedDescriptor } from './FormattedDescriptor';

/**
 * Date formatter to automatically translate to/from Date objects and NS date strings
 *
 * @param target
 * @param propertyKey
 * @returns
 */
export function DateDescriptor<T extends NetsuiteCurrentRecord>(target: T, propertyKey: string): any {
	return FormattedDescriptor<T>(format.Type.DATE, target, propertyKey);
}
