/*
 * Copyright 2016-2025 Explore Consulting
 * Copyright 2025-Present NS Tools Team
 *
 * See LICENSE file for additional information.
 */

import { FieldType, NetsuiteRecord } from '../Record';
import { type Sublist, SublistFieldType, SublistLine } from '../Sublist';

export class DiscountSublist extends SublistLine {
	@SublistFieldType.freeformtext
	memo: string;

	@SublistFieldType.decimalnumber
	fromquantity: number;

	@SublistFieldType.percent
	percent: number;

	@SublistFieldType.decimalnumber
	quantityordered: number;

	@SublistFieldType.decimalnumber
	rate: number;
}

/**
 * NetSuite Item Pricing Record type with custom fields.
 */
export class ItemPricingBase extends NetsuiteRecord {
	// @TODO: Double check this record type
	static override recordType() {
		return 'itempricing';
	}

	@FieldType.select
	calculatequantitydiscounts: string | undefined;

	@FieldType.select
	priceusing: string | undefined;

	@FieldType.select
	inputusing: string | undefined;

	@FieldType.sublist(DiscountSublist)
	discount: Sublist<DiscountSublist>;
}
