import { NetsuiteCurrentRecord } from '../Record';
import { parseProp } from '../Record';
import { DefaultFieldDescriptor } from './DefaultFieldDescriptor';

export function GetTextDescriptor<T extends NetsuiteCurrentRecord>(joinedFieldId: string, classReference) {
    return (target: T, propertyKey: string) => {
      const [isTextField, nsfield] = parseProp(propertyKey)
        const privateInstanceKey = `__join_${propertyKey}`;

        Object.defineProperty(target, propertyKey, {
            get: function () {
                if (Number(this.nsrecord.id) > 0) {
                return DefaultFieldDescriptor(target, propertyKey).get();
                }
            
                if (!this[privateInstanceKey]) {
                    try {
                        Object.defineProperty(this, privateInstanceKey, {
                            value: new classReference(this.nsrecord.getValue({ fieldId: propertyKey })),
                            writable: true,
                            enumerable: false,
                            configurable: true,
                        });
                    } catch (_e) {
                        this[privateInstanceKey] = new classReference(this.nsrecord.getValue({ fieldId: propertyKey }));
                    }
                }

                return this[privateInstanceKey] ? this[privateInstanceKey] : null;
            },
            set: DefaultFieldDescriptor(target, propertyKey).set,
         enumerable: false,
         configurable: true,
      });
    };
}
