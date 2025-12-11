/*
 * Copyright 2016-2025 Explore Consulting
 * Copyright 2025-Present NS Tools Team
 *
 * See LICENSE file for additional information.
 */

import * as record from 'N/record';
import { FieldType } from '../Record';
import { type Sublist, SublistFieldType, SublistLine } from '../Sublist';
import { InventoryDetailBase } from './InventoryDetailBase';
import { TransactionBase } from './Transaction';

/**
 * Work Order Issue Components sublist.
 */
export class ComponentSublist extends SublistLine {
	@SublistFieldType.select
	item: number;

	@SublistFieldType.freeformtext
	compitemname: string;

	@SublistFieldType.integernumber
	quantity: number;

	@SublistFieldType.select
	units: number;

	@SublistFieldType.freeformtext
	unitsText: string;

	@SublistFieldType.checkbox
	isserial: boolean;

	@SublistFieldType.checkbox
	isnumbered: boolean;

	@SublistFieldType.subrecord(InventoryDetailBase)
	componentinventorydetail: InventoryDetailBase;
}

/**
 * NetSuite Work Order Issue record type.
 */
export class WorkOrderIssueBase extends TransactionBase {
	@FieldType.select
	endoperation: number;

	@FieldType.select
	item: number;

	@FieldType.select
	manufacturingrouting: number;

	@FieldType.select
	revision: number;

	@FieldType.freeformtext
	revisionmemo: string;

	@FieldType.select
	startoperation: number;

	@FieldType.sublist(ComponentSublist)
	component: Sublist<ComponentSublist>;

	static override recordType() {
		return record.Type.WORK_ORDER_ISSUE;
	}
}
