/*
* Copyright 2016-2025 Explore Consulting
* Copyright 2025-Present NS Tools Team
*
* See LICENSE file for additional information.
*/

import * as LogManager from '../../../Logger';
import type { SublistLine } from '../../Sublist';

const log = LogManager.getLogger('nsdal-sublist');

/**
 * handles setting sublist fields for any combination of setValue/setText and standard/dynamic record
 * @param fieldId
 * @param value
 * @param isText
 */
export function setSublistValue(this: SublistLine, fieldId: string, value: any, isText: boolean) {
    // ignore undefined's
    if (value !== undefined) {
        const options = {
            sublistId: this.sublistId,
            fieldId: fieldId,
        };

        if (this.useDynamicModeAPI && this.nsrecord.isDynamic) {
            this.nsrecord.selectLine({ sublistId: this.sublistId, line: this._line });
            isText
                ? this.nsrecord.setCurrentSublistText({
                        ...options,
                        ignoreFieldChange: this.ignoreFieldChange,
                        forceSyncSourcing: this.forceSyncSourcing,
                        text: value,
                    })
                : this.nsrecord.setCurrentSublistValue({
                        ...options,
                        ignoreFieldChange: this.ignoreFieldChange,
                        forceSyncSourcing: this.forceSyncSourcing,
                        value: value,
                    });
        } else {
            isText
                ? this.nsrecord.setSublistText({ ...options, line: this._line, text: value })
                : this.nsrecord.setSublistValue({ ...options, line: this._line, value: value });
        }
    } else log.debug(`ignoring field [${fieldId}]`, 'field value is undefined');
}

export function getSublistValue(this: SublistLine, fieldId: string, isText: boolean) {
    const options = {
        sublistId: this.sublistId,
        fieldId: fieldId,
    };
    log.debug(`getting sublist ${isText ? 'text' : 'value'}`, options);
    if (this.useDynamicModeAPI && this.nsrecord.isDynamic) {
        this.nsrecord.selectLine({ sublistId: this.sublistId, line: this._line });
        return isText ? this.nsrecord.getCurrentSublistText(options) : this.nsrecord.getCurrentSublistValue(options);
    } else {
        return isText
            ? this.nsrecord.getSublistText({ ...options, line: this._line })
            : this.nsrecord.getSublistValue({ ...options, line: this._line });
    }
}
