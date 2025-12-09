/*
* Copyright 2016-2025 Explore Consulting
* Copyright 2025-Present NS Tools Team
*
* See LICENSE file for additional information.
*/

import * as log from 'N/log';
import * as record from 'N/record';
import { ItemSublist, SalesOrderBase } from "../../DataAccess/BaseRecords/SalesOrderBase";
import { FieldType } from "../../DataAccess/FieldType";
import { type Sublist, SublistFieldType } from '../../DataAccess/Sublist';

/**
 * Basic usage of pulling a Netsuite record using the native API, and looping over the line contents
 */
export namespace Netsuite {
    const order = record.load({
        type: record.Type.SALES_ORDER,
        id: 1234,
    });

    const notes: string = order.getValue({
        fieldId: 'custbody_notes',
    }) as string;

    log.debug('Notes', notes);

    const count = order.getLineCount({
        sublistId: 'item',
    });

    const itemInfo: ItemInfo[] = [];

    for (let x = 0; x < count; x++) {
        const item = order.getSublistValue({
            sublistId: 'item',
            fieldId: 'item',
            line: x,
        });
        const quantity = order.getSublistValue({
            sublistId: 'item',
            fieldId: 'quantity',
            line: x,
        });
        const model = order.getSublistValue({
            sublistId: 'item',
            fieldId: 'custcol_model',
            line: x,
        });

        itemInfo.push({
            item: Number(item),
            quantity: Number(quantity),
            model: String(model),
        });
    }
}

export namespace DALBasicUsage {
    class SalesOrderSublist extends ItemSublist {
        @SublistFieldType.freeformtext
        custcol_model: string;
    }

    class SalesOrder extends SalesOrderBase {
        @FieldType.freeformtext
        custbody_notes: string;

        // Optional alias example, personal preference if you use them or not. When working with
        // legacy environments where naming may not be standardized this may be beneficial.
        @FieldType.alias('custbody_notes') notes: string;

        // Override the default item sublist with our environment specific one with model category
        @FieldType.sublist(SalesOrderSublist)
        override item: Sublist<SalesOrderSublist>;
    }

    const order = new SalesOrder(1234);
    const notes: string = order.custbody_notes;
    const notes_alias: string = order.notes;
    log.debug('Notes', notes);
    log.debug('Notes via alias', notes_alias);
    const itemInfo: ItemInfo[] = [];

    for (const line of order.item) {
        const item = line.item;
        const quantity = line.quantity;

        itemInfo.push({
            item: item,
            quantity: quantity,
            model: line.custcol_model,
        });
    }
}

interface ItemInfo {
    item: number;
    quantity: number;
    model: string;
}