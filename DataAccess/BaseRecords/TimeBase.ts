/*
* Copyright 2016-2025 Explore Consulting
* Copyright 2025-Present NS Tools Team
*
* See LICENSE file for additional information.
*/

/**
 * Created by asariego on 4/8/24.
 */
import * as record from 'N/record';
import { FieldType } from '../Record';
import { TransactionBase } from './Transaction';

/**
 * NetSuite Time Record
 */
export class TimeBase extends TransactionBase {
	static override recordType() {
		return record.Type.TIME_BILL;
	}

	@FieldType.select
	approvalstatus: number;

	@FieldType.select
	casetaskevent: number;

	@FieldType.select
	class: number;

	@FieldType.select
	customer: number;

	@FieldType.select
	override customform: number;

	@FieldType.select
	override department: number;

	@FieldType.select
	employee: number;

	@FieldType.freeformtext
	override externalid: string;

	@FieldType.freeformtext
	hours: string;

	@FieldType.checkbox
	isbillable: boolean;

	@FieldType.checkbox
	isexempt: boolean;

	@FieldType.checkbox
	isproductive: boolean;

	@FieldType.checkbox
	isutilized: boolean;

	@FieldType.select
	item: number;

	@FieldType.select
	override location: number;

	@FieldType.textarea
	override memo: string;

	@FieldType.freeformtext
	overriderate: string;

	@FieldType.checkbox
	paidexternally: boolean;

	@FieldType.select
	payrollitem: number;

	@FieldType.freeformtext
	price: string;

	@FieldType.select
	projecttaskassignment: number;

	@FieldType.freeformtext
	rate: string;

	@FieldType.textarea
	rejectionnote: string;

	@FieldType.select
	serviceitem: number;

	@FieldType.select
	override subsidiary: number;

	@FieldType.checkbox
	supervisorapproval: boolean;

	@FieldType.checkbox
	timemodified: boolean;

	@FieldType.select
	timesheet: number;

	@FieldType.select
	timetype: number;

	@FieldType.date
	override trandate: Date;
}
