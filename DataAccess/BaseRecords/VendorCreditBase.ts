/*
* Copyright 2016-2025 Explore Consulting
* Copyright 2025-Present NS Tools Team
*
* See LICENSE file for additional information.
*/

import * as record from 'N/record';
import { FieldType } from '../Record';
import { type Sublist, SublistFieldType, SublistLine } from '../Sublist';
import { TransactionBase } from './Transaction';

/**
 * Vendor Credit Expense Sublist
 */
export class ExpenseSublist extends SublistLine {
	@SublistFieldType.select
	account: number;

	@SublistFieldType.currency
	amount: number | string;

	@SublistFieldType.freeformtext
	memo: string;

	@SublistFieldType.select
	department: number;

	@SublistFieldType.select
	location: number;

	@SublistFieldType.select
	expense: number;
}

/**
 * Vendor Credit Item Sublist
 */
export class ItemSublist extends SublistLine {
	@SublistFieldType.select
	account: number;

	@SublistFieldType.currency
	amount: number | string;

	@SublistFieldType.freeformtext
	memo: string;

	@SublistFieldType.select
	item: number;
}

/**
 * Vendor Credit Apply Sublist
 */
export class ApplySublist extends SublistLine {
	@SublistFieldType.checkbox
	apply: boolean;

	@SublistFieldType.currency
	amount: number | string;

	@SublistFieldType.date
	applydate: Date;

	@SublistFieldType.freeformtext
	doc: string;
}

/**
 * Vendor Credit record Type
 */
export class VendorCreditBase extends TransactionBase {
	@FieldType.checkbox
	autoapply: boolean;

	@FieldType.select
	account: number;

	@FieldType.sublist(ItemSublist)
	item: Sublist<ItemSublist>;

	@FieldType.sublist(ExpenseSublist)
	expense: Sublist<ExpenseSublist>;

	@FieldType.sublist(ApplySublist)
	apply: Sublist<ApplySublist>;

	static override recordType() {
		return record.Type.VENDOR_CREDIT;
	}
}
