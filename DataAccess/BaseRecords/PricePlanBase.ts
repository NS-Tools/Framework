/*
* Copyright 2016-2025 Explore Consulting
* Copyright 2025-Present NS Tools Team
*
* See LICENSE file for additional information.
*/

import * as record from 'N/record';
import { FieldType, NetsuiteRecord, type Nullable } from '../Record';
import { type Sublist, SublistFieldType, SublistLine } from '../Sublist';

/**
 * NetSuite Price Plan Price Tiers sublist (pricetiers)
 */
export class PriceTiersBase extends SublistLine {
	/**
	 * Above Quantity
	 */
	@SublistFieldType.integernumber
	fromval: number;

	/**
	 * Line ID
	 */
	@SublistFieldType.integernumber
	lineid: Nullable<string | number>;

	/**
	 * Price Plan
	 */
	@SublistFieldType.select
	priceplan: number;

	/**
	 * Price Tier
	 */
	@SublistFieldType.freeformtext
	pricetier: string;

	/**
	 * Pricing Option
	 */
	@SublistFieldType.select
	pricingoption: number;

	/**
	 * Value
	 */
	@SublistFieldType.currency
	value: number;
}

/**
 * NetSuite Price Plan (priceplan)
 */
export class PricePlanBase extends NetsuiteRecord {
	/**
	 * Currency
	 */
	@FieldType.select
	currency: number;

	/**
	 * External ID
	 */
	@FieldType.freeformtext
	externalid: string;

	/**
	 * Internal ID
	 */
	@FieldType.integernumber
	internalid: number;

	/**
	 * Price Plan Type
	 */
	@FieldType.select
	priceplantype: number;

	/**
	 * pricetiers  - Price Plan Price Tiers (Sublist)
	 */
	@FieldType.sublist(PriceTiersBase)
	pricetiers: Sublist<PriceTiersBase>;

	static override recordType() {
		return record.Type.PRICE_PLAN;
	}
}
