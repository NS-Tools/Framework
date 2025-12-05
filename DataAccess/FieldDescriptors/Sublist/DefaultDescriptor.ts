/*
* Copyright 2016-2025 Explore Consulting
* Copyright 2025-Present NS Tools Team
*
* See LICENSE file for additional information.
*/

import * as LogManager from '../../../Logger';
import { parseProp } from '../../Helpers';
import type { SublistLine } from '../../Sublist';
import { getSublistValue, setSublistValue } from './SublistValues';

const log = LogManager.getLogger('nsdal-sublist');

/**
 * Generic property descriptor with basic default algorithm that exposes the field value directly with no
 * other processing. If the target field name ends with 'Text' it uses NetSuite `getText()/setText()` otherwise (default)
 * uses `getValue()/setValue()`
 * Apply this decorator (or its aliases) to properties on SublistLine subtypes
 * @returns an object property descriptor to be used
 * with Object.defineProperty
 */
export function DefaultDescriptor<T extends SublistLine>(target: T, propertyKey: string): any {
    log.debug('creating default descriptor', `field: ${propertyKey}`);
    const [isTextField, nsfield] = parseProp(propertyKey);
    return {
        get: function (this: SublistLine) {
            return getSublistValue.call(this, nsfield, isTextField);
        },
        set: function (this: SublistLine, value) {
            setSublistValue.call(this, nsfield, value, isTextField);
        },
        enumerable: true, //default is false
    };
}
