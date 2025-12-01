/*
* Copyright 2016-2025 Explore Consulting
* Copyright 2025-Present NS Tools Team
*
* See LICENSE file for additional information.
*/

import * as record from 'N/record';
import { FieldType } from '../Record';
import { SublistFieldType, SublistLine } from '../Sublist';
import { InventoryDetailBase } from './InventoryDetailBase';
import { TransactionBase } from './Transaction';

/**
 * Work Order Completion Components sublist.
 */
export class ComponentSublist extends SublistLine {
	@SublistFieldType.select
	item: number;

	@SublistFieldType.integernumber
	linenumber: number;

	@SublistFieldType.integernumber
	quantity: number;

	@SublistFieldType.float
	quantityper: number;

	@SublistFieldType.float
	unitcost: number;

	@SublistFieldType.subrecord(InventoryDetailBase)
	componentinventorydetail: InventoryDetailBase;
}

/**
 * NetSuite Work Order Completion record type
 */
export class WorkOrderCompletionBase extends TransactionBase {
	@FieldType.float
	completedquantity: number;

	@FieldType.select
	endoperation: number;

	@FieldType.checkbox
	isbackflush: boolean;

	@FieldType.select
	manufacturingrouting: number;

	@FieldType.float
	orderquantity: number;

	@FieldType.select
	revision: number;

	@FieldType.freeformtext
	revisionmemo: string;

	@FieldType.float
	scrapquantity: number;

	@FieldType.select
	startoperation: number;

	@FieldType.select
	item: number;

	@FieldType.freeformtext
	quantity: string;

	@FieldType.float
	unitcost: number;

	@FieldType.select
	units: number;

	@FieldType.subrecord(InventoryDetailBase)
	inventorydetail: InventoryDetailBase;

	static override recordType() {
		return record.Type.WORK_ORDER_COMPLETION;
	}
}
