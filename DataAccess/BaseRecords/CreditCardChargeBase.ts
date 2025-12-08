/*
* Copyright 2016-2025 Explore Consulting
* Copyright 2025-Present NS Tools Team
*
* See LICENSE file for additional information.
*/

/**
 * NetSuite Credit Card Charge Record
 */
import * as record from 'N/record';
import { FieldType } from '../Record';
import { SublistFieldType, SublistLine } from '../Sublist';
import { TransactionBase } from './Transaction';

/**
 * NetSuite Credit Card Charge Record
 */
export class CreditCardChargeBase extends TransactionBase {
	static override recordType() {
		return record.Type.CREDIT_CARD_CHARGE as const;
	}

	@FieldType.select
	account: number;

	@FieldType.currency
	balance: number;

	@FieldType.select
	class: number;

	@FieldType.checkbox
	cleared: boolean;

	@FieldType.date
	cleareddate: Date;

	@FieldType.datetime
	override createddate: Date;

	@FieldType.select
	currency: number;

	@FieldType.freeformtext
	currencyname: string;

	@FieldType.freeformtext
	currencysymbol: string;

	@FieldType.select
	override customform: number;

	@FieldType.select
	override department: number;

	@FieldType.select
	override entity: number;

	@FieldType.freeformtext
	entity_nexus_country: string;

	@FieldType.select
	entitynexus: number;

	@FieldType.currency
	exchangerate: number;

	@FieldType.freeformtext
	override externalid: string;

	@FieldType.checkbox
	isbasecurrency: boolean;

	@FieldType.datetime
	override lastmodifieddate: Date;

	@FieldType.select
	override location: number;

	@FieldType.freeformtext
	override memo: string;

	@FieldType.select
	nexus: number;

	@FieldType.freeformtext
	nexus_country: string;

	@FieldType.select
	override postingperiod: number;

	@FieldType.select
	override subsidiary: number;

	@FieldType.freeformtext
	taxperiod: string;

	@FieldType.date
	taxpointdate: Date;

	@FieldType.checkbox
	taxpointdateoverride: boolean;

	@FieldType.currency
	total: number;

	@FieldType.date
	override trandate: Date;

	@FieldType.freeformtext
	override tranid: string;

	@FieldType.freeformtext
	transactionnumber: string;

	@FieldType.radio
	trantype: boolean;

	@FieldType.freeformtext
	updatecurrency: string;

	@FieldType.currency
	usertotal: number;
}
/**
 * Sublist 'item' on Credit Card Charges
 */
export class ItemSublist extends SublistLine {
	@SublistFieldType.currency
	amount: number;

	@SublistFieldType.freeformtext
	billvariancestatus: string;

	@SublistFieldType.select
	catchupperiod: number;

	@SublistFieldType.select
	class: number;

	@SublistFieldType.select
	customer: number;

	@SublistFieldType.checkbox
	deferrevrec: boolean;

	@SublistFieldType.select
	department: number;

	@SublistFieldType.freeformtext
	description: string;

	@SublistFieldType.freeformtext
	id: string;

	@SublistFieldType.checkbox
	isbillable: boolean;

	@SublistFieldType.freeformtext
	isvsoebundle: string;

	@SublistFieldType.select
	item: number;

	@SublistFieldType.freeformtext
	itemsubtype: string;

	@SublistFieldType.freeformtext
	itemtype: string;

	@SublistFieldType.freeformtext
	line: string;

	@SublistFieldType.integernumber
	linenumber: number;

	@SublistFieldType.freeformtext
	linked: string;

	@SublistFieldType.select
	location: number;

	@SublistFieldType.freeformtext
	matrixtype: string;

	@SublistFieldType.namevaluelist
	options: string;

	@SublistFieldType.freeformtext
	printitems: string;

	@SublistFieldType.float
	quantity: number;

	@SublistFieldType.rate
	rate: number;

	@SublistFieldType.freeformtext
	rateschedule: string;

	@SublistFieldType.freeformtext
	vendorname: string;
}
/**
 * Sublist 'expense' on Credit Card Charges
 */
export class ExpenseSublist extends SublistLine {
	@SublistFieldType.select
	account: number;

	@SublistFieldType.currency
	amount: number;

	@SublistFieldType.freeformtext
	category: string;

	@SublistFieldType.select
	class: number;

	@SublistFieldType.select
	customer: number;

	@SublistFieldType.select
	department: number;

	@SublistFieldType.integernumber
	expenseitem: number;

	@SublistFieldType.checkbox
	isbillable: boolean;

	@SublistFieldType.integernumber
	line: number;

	@SublistFieldType.select
	location: number;

	@SublistFieldType.freeformtext
	memo: string;

	@SublistFieldType.integernumber
	numrules: number;
}
/**
 * Sublist 'reimbursements' on Credit Card Charges
 */
export class ReimbursementsSublist extends SublistLine {
	@SublistFieldType.freeformtext
	id: string;
}
