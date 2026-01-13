/*
 * Copyright 2016-2025 Explore Consulting
 * Copyright 2025-Present NS Tools Team
 *
 * See LICENSE file for additional information.
 */

import * as record from 'N/record';
import { FieldType, NetsuiteRecord } from '../Record';
import { type Sublist, SublistFieldType, SublistLine } from '../Sublist';

export class Recurrence extends SublistLine {
	@SublistFieldType.decimalnumber
	amount: number;

	@SublistFieldType.freeformtext
	amountText: string;

	@SublistFieldType.integernumber
	count: number;

	@SublistFieldType.select
	paymentterms: number;

	@SublistFieldType.select
	recurrenceid: number;

	@SublistFieldType.date
	recurrencedate: Date;

	@SublistFieldType.checkbox
	relativetoprevious: boolean;

	@SublistFieldType.select
	units: number | string;
}

/**
 * NetSuite Billing Schedule Record type with custom fields.
 */
export class BillingScheduleBase extends NetsuiteRecord {
	@FieldType.freeformtext
	name: string;

	@FieldType.decimalnumber
	initialamount: number;

	@FieldType.freeformtext
	initialamountText: string;

	@FieldType.select
	initialterms: number;

	@FieldType.select
	frequency: number | string;

	@FieldType.select
	repeatevery: number | string;

	@FieldType.select
	numberremaining: number;

	@FieldType.checkbox
	inarrears: boolean;

	@FieldType.select
	recurrenceterms: number;

	@FieldType.sublist(Recurrence)
	recurrence: Sublist<Recurrence>;

	static override recordType() {
		return record.Type.BILLING_SCHEDULE;
	}
}
