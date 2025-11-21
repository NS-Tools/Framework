import { NetsuiteCurrentRecord } from '../Record';
import * as format from 'N/format';
import * as LogManager from '../../EC_Logger';

const log = LogManager.getLogger('DataAccess.Record');

/**
 * Generic property descriptor with algorithm for values that need to go through the NS format module on field
 * write. Returns plain getValue() on reads
 * note: does not take into account timezone
 * This decorator applies to record properties only (i.e. not for use on sublists).
 * @param {string} formatType the NS field type (e.g. 'date')
 * @param target
 * @param propertyKey
 * @returns  an object property descriptor to be used
 * with decorators
 */
export function FormattedDescriptor<T extends NetsuiteCurrentRecord> (formatType: format.Type, target: T, propertyKey: string): any {
   return {
      get: function () {
         const formattedValue = format.format({ type: formatType, value: this.nsrecord.getValue({ fieldId: propertyKey }) })
         return formattedValue;
      },
      set: function (value) {
         // allow null to flow through, but ignore undefined's
         if (value !== undefined) {
            const formattedValue = format.format({ type: formatType, value: value })
            log.debug(`setting field [${propertyKey}:${formatType}]`,
               `to formatted value [${formattedValue}] javascript type:${typeof formattedValue}`)
            if (value === null) this.nsrecord.setValue({ fieldId: propertyKey, value: null })
            else this.nsrecord.setValue({ fieldId: propertyKey, value: formattedValue })
         } else log.info(`not setting ${propertyKey} field`, 'value was undefined')
      },
      enumerable: true //default is false
   }
}