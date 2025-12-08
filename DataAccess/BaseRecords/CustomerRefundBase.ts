/*
* Copyright 2016-2025 Explore Consulting
* Copyright 2025-Present NS Tools Team
*
* See LICENSE file for additional information.
*/

/**
 * Represents a Customer Refund (customerrefund) transaction type in NetSuite
 */

import * as record from 'N/record';
import { FieldType } from '../Record';
import { type Sublist, SublistFieldType, SublistLine } from '../Sublist';
import { TransactionBase } from './Transaction';

/**
 * The Credits (apply) sublist on Customer Refund transaction
 */
export class ApplySublist extends SublistLine {
	@SublistFieldType.currency
	amount: number;

	@SublistFieldType.checkbox
	apply: boolean;

	@SublistFieldType.date
	applydate: Date;

	@SublistFieldType.freeformtext
	createdfrom: string;

	@SublistFieldType.freeformtext
	doc: string;

	@SublistFieldType.currency
	due: number;

	@SublistFieldType.date
	duedate: Date;

	@SublistFieldType.freeformtext
	internalid: string;

	@SublistFieldType.freeformtext
	line: string;

	@SublistFieldType.freeformtext
	refnum: string;

	@SublistFieldType.currency
	total: number;

	@SublistFieldType.freeformtext
	url: string;
}

/**
 * The Customer Refund (customerrefund) transaction in NetSuite
 */
export class CustomerRefundBase extends TransactionBase {
	static override recordType() {
		return record.Type.CUSTOMER_REFUND;
	}

	@FieldType.select
	account: number;

	@FieldType.select
	aracct: number;

	@FieldType.freeformtext
	ccname: string;

	@FieldType.freeformtext
	ccnumber: string;

	@FieldType.checkbox
	chargeit: boolean;

	@FieldType.select
	creditcard: number;

	@FieldType.select
	customer: number;

	@FieldType.select
	paymentmethod: number;

	/**
	 * use this in static mode only (e.g. not record mode 'dynamic'
	 */
	@FieldType.sublist(ApplySublist)
	apply: Sublist<ApplySublist>;

	/**
	 * Locates first matching line on the 'apply' sublist that corresponds to the passed related recordid.
	 * Returns an object that can be used to manipulate the found line in 'current' (dynamic) mode. The returned
	 * value is a subset of the full apply sublist for brevity (exposing the most commonly used properties)
	 * Note the customer refund instance must be constructed in dynamic mode and include the `{ entity: <customer>}` default
	 * values initializer at construction.
	 * @param  docId the internal id of the related document that makes a line appear on the apply sublist
	 * e.g. a credit memo on the customer refund
	 * calls to nsrecord.setCurrentSublistValue()
	 */
	override findApplyLine(docId: number) {
		return super.findApplyLine(docId);
	}
}
