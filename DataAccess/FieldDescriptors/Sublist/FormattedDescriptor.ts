/*
* Copyright 2016-2025 Explore Consulting
* Copyright 2025-Present NS Tools Team
*
* See LICENSE file for additional information.
*/

import * as format from 'N/format';
import * as LogManager from '../../../utility/Logger';
import type { SublistLine } from '../../Sublist';
import { getSublistValue, setSublistValue } from './SublistValues';

const log = LogManager.getLogger('nsdal-sublist');

/**
 * Generic property descriptor with algorithm for values that need to go through the NS format module
 * note: does not take into account timezone
 * @param {string} formatType the NS field type (e.g. 'date')
 * @param target
 * @param propertyKey
 * @returns  an object property descriptor to be used
 * with decorators
 */
export function FormattedDescriptor(formatType: format.Type, target: any, propertyKey: string): any {
    return {
        get: function (this: SublistLine) {
            log.debug(`getting formatted field [${propertyKey}]`);
            const value = getSublistValue.call(this, propertyKey, false) as string; // to satisfy typing for format.parse(value) below.
            log.debug(`transforming field [${propertyKey}] of type [${formatType}]`, `with value ${value}`);
            // ensure we don't return moments for null, undefined, etc.
            // returns the 'raw' type which is a string or number for our purposes
            return value ? format.parse({ type: formatType, value: value }) : value;
        },
        set: function (this: SublistLine, value) {
            let formattedValue: number | null;
            // allow null to flow through, but ignore undefined's
            if (value !== undefined) {
                switch (formatType) {
                    // ensure numeric typed fields get formatted to what netsuite needs
                    // in testing with 2016.1 fields like currency had to be a number formatted specifically (e.g. 1.00
                    // rather than 1 or 1.0 for them to be accepted without error
                    case format.Type.CURRENCY:
                    case format.Type.CURRENCY2:
                    case format.Type.FLOAT:
                    case format.Type.INTEGER:
                    case format.Type.NONNEGCURRENCY:
                    case format.Type.NONNEGFLOAT:
                    case format.Type.POSCURRENCY:
                    case format.Type.POSFLOAT:
                    case format.Type.POSINTEGER:
                    case format.Type.RATE:
                    case format.Type.RATEHIGHPRECISION:
                        formattedValue = Number(format.format({ type: formatType, value: value }));
                        break;
                    default:
                        formattedValue = format.format({ type: formatType, value: value });
                }
                log.debug(
                    `setting sublist field [${propertyKey}:${formatType}]`,
                    `to formatted value [${formattedValue}] (unformatted vale: ${value})`,
                );
                if (value === null) setSublistValue.call(this, propertyKey, null);
                else setSublistValue.call(this, propertyKey, formattedValue);
            } else log.info(`not setting sublist ${propertyKey} field`, 'value was undefined');
        },
        enumerable: true, //default is false
    };
}