import { LineConstructor, parseSublistProp } from '../Record'
import { Sublist, SublistLine } from '../Sublist'
import * as LogManager from '../../EC_Logger';

const log = LogManager.getLogger('DataAccess.Record');

/**
 * Decorator for adding sublists with each line of the sublist represented by a type T which
 * defines the properties you want on the sublist
 * @param ctor Constructor for the type that has the properties you want from each sublist line.
 * e.g. Invoice.ItemSublistLine
 */
export function SublistDescriptor<T extends SublistLine> (ctor: LineConstructor<T>) {
   return function (target: any, propertyKey: string): any {
      const [, nssublist] = parseSublistProp(propertyKey)
      const privateProp = `_${nssublist}`
      return {
         enumerable: true,
         // sublist is read only for now - if we have a use case where this should be assigned then tackle it
         get: function () {
            if (!this[privateProp]) {
               log.debug('initializing sublist', `sublist property named ${propertyKey}, sublist id ${nssublist}`)
               // using defineProperty() here defaults to making the property non-enumerable which is what we want
               // for this 'private' property so it doesn't appear on serialization (e.g. JSON.stringify())
               Object.defineProperty(this, privateProp, { value: new Sublist(ctor, this.nsrecord, nssublist) })
            }
            return this[privateProp]
         },
      }
   }
}
