/*
 * Copyright 2016-2025 Explore Consulting
 * Copyright 2025-Present NS Tools Team
 *
 * See LICENSE file for additional information.
 */

/**
 * NS Base Landed Cost subrecord contains definitions for the built in fields
 */
import { FieldType, NetsuiteRecord } from '../Record';
import { type Sublist, SublistFieldType, SublistLine } from '../Sublist';

export class LandedCostDataSublist extends SublistLine {
	@SublistFieldType.currency
	amount: number;

	@SublistFieldType.select
	landedcostcategory: number;
}

/**
 * The inventory detail 'subrecord'. In SS2.0 this is mostly treated as a normal record object.
 * However I caution against trying to create new instances of it, only passing an existing record
 * to the constructor.
 */
export class LandedCostBase extends NetsuiteRecord {
	static override recordType() {
		return 'landedcost';
	}

	@FieldType.sublist(LandedCostDataSublist)
	landedcostdata: Sublist<LandedCostDataSublist>;
}
