/*
* Copyright 2016-2025 Explore Consulting
* Copyright 2025-Present NS Tools Team
*
* See LICENSE file for additional information.
*/

/**
 * Represents a Return Authorization (returnauthorization) transaction type in NetSuite
 */

import * as record from 'N/record';
import { FieldType } from '../Record';
import { type Sublist, SublistFieldType, SublistLine } from '../Sublist';
import { TransactionBase } from './Transaction';

/**
 * Return Authorization Items (item) sublist
 */
export class ItemSublist extends SublistLine {
	@SublistFieldType.currency
	amount: number;

	@SublistFieldType.textarea
	description: string;

	@SublistFieldType.checkbox
	istaxable: boolean;

	@SublistFieldType.select
	item: number;

	@SublistFieldType.freeformtext
	itemtype: string;

	@SublistFieldType.integernumber
	linenumber: number;

	@SublistFieldType.select
	price: number;

	@SublistFieldType.float
	quantity: number;

	@SublistFieldType.float
	rate: number;

	@SublistFieldType.date
	revrecstartdate: Date;

	@SublistFieldType.date
	revrecenddate: Date;

	@SublistFieldType.select
	taxcode: number;

	@SublistFieldType.percent
	taxrate: number;

	@SublistFieldType.select
	units: number;
}

/**
 * Return Authorization Base Type
 */
export class ReturnAuthorizationBase extends TransactionBase {
	static override recordType() {
		return record.Type.RETURN_AUTHORIZATION;
	}

	@FieldType.select
	class: number;

	/**
	 * This field shows the transaction this transaction was created from.
	 */
	@FieldType.select
	createdfrom: number;

	@FieldType.select
	discountitem: number;

	@FieldType.textarea
	message: string;

	@FieldType.select
	messagesel: number;

	@FieldType.select
	override orderstatus: number;

	@FieldType.checkbox
	tobeemailed: boolean;

	@FieldType.currency
	subtotal: number;

	@FieldType.currency
	total: number;

	@FieldType.sublist(ItemSublist)
	item: Sublist<ItemSublist>;
}
