/*
 * Copyright 2016-2025 Explore Consulting
 * Copyright 2025-Present NS Tools Team
 *
 * See LICENSE file for additional information.
 */

/**
 * NetSuite opportunity transaction record
 */

import * as record from 'N/record';
import { FieldType } from '../Record';
import { type Sublist, SublistFieldType, SublistLine } from '../Sublist';
import { AddressBase } from './AddressBase';
import { TransactionBase } from './Transaction';

/**
 * The 'item' sublist on opportunity records
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

	@SublistFieldType.integernumber
	linenumber: number;

	@SublistFieldType.select
	price: number;

	@SublistFieldType.float
	quantity: number;

	@SublistFieldType.float
	rate: number;

	@SublistFieldType.select
	taxcode: number;

	@SublistFieldType.percent
	taxrate1: number;

	@SublistFieldType.select
	units: number;
}

/**
 * NetSuite Opportunity Record
 */
export class OpportunityBase extends TransactionBase {
	static override recordType() {
		return record.Type.OPPORTUNITY;
	}

	@FieldType.currency
	balance: number;

	@FieldType.subrecord(AddressBase)
	billingaddress: AddressBase;

	@FieldType.freeformtext
	billaddr1: string;

	@FieldType.freeformtext
	billaddr2: string;

	@FieldType.freeformtext
	billaddr3: string;

	@FieldType.freeformtext
	billphone: string;

	@FieldType.freeformtext
	billstate: string;

	@FieldType.freeformtext
	billzip: string;

	@FieldType.freeformtext
	billaddress: string;

	@FieldType.select
	currency: number;

	@FieldType.select
	entitystatus: number;

	@FieldType.select
	leadsource: number;

	@FieldType.select
	partner: number;

	@FieldType.subrecord(AddressBase)
	shippingaddress: AddressBase;

	@FieldType.currency
	total: number;

	@FieldType.sublist(ItemSublist)
	item: Sublist<ItemSublist>;
}
