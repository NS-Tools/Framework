/*
 * Copyright 2016-2025 Explore Consulting
 * Copyright 2025-Present NS Tools Team
 *
 * See LICENSE file for additional information.
 */

/**
 * NetSuite Expense Report record
 */

import * as record from 'N/record';
import { FieldType } from '../Record';
import { type Sublist, SublistFieldType, SublistLine } from '../Sublist';
import { TransactionBase } from './Transaction';

/**
 * The 'expense' sublist
 */
export class ExpenseSublist extends SublistLine {
	@SublistFieldType.currency
	amount: number;

	@SublistFieldType.select
	category: number;

	@SublistFieldType.select
	class: number;

	@SublistFieldType.select
	customer: number;

	@SublistFieldType.select
	department: number;

	@SublistFieldType.select
	expenseaccount: number;

	@SublistFieldType.date
	expensedate: Date;

	@SublistFieldType.select
	expenseitem: number;

	@SublistFieldType.integernumber
	line: number;

	@SublistFieldType.select
	location: number;

	@SublistFieldType.freeformtext
	memo: string;

	@SublistFieldType.float
	quantity: number;

	@SublistFieldType.currency
	rate: number;

	@SublistFieldType.freeformtext
	refnumber: string;
}

/**
 * NetSuite Expense Report Record Type
 */
export class ExpenseReportBase extends TransactionBase {
	@FieldType.select
	account: number;

	@FieldType.currency
	amount: number;

	@FieldType.select
	approvalstatus: string;

	@FieldType.select
	class: number;

	@FieldType.date
	duedate: Date;

	@FieldType.freeformtext
	transactionnumber: string;

	@FieldType.sublist(ExpenseSublist)
	items: Sublist<ExpenseSublist>;

	static override recordType() {
		return record.Type.EXPENSE_REPORT;
	}
}
