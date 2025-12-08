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
export class TimesheetBase extends TransactionBase {
	static override recordType() {
		return record.Type.TIME_SHEET;
	}

	@FieldType.select
	approvalstatus: number;

	@FieldType.select
	override customform: number;

	@FieldType.select
	employee: number;

	@FieldType.datetime
	enddate: Date;

	@FieldType.freeformtext
	override externalid: string;

	@FieldType.datetime
	startdate: Date;

	@FieldType.select
	override subsidiary: number;

	@FieldType.select
	timeGridList: number;

	@FieldType.decimalnumber
	totalHours: number;
}
