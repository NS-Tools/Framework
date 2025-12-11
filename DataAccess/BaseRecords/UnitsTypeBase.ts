/*
 * Copyright 2016-2025 Explore Consulting
 * Copyright 2025-Present NS Tools Team
 *
 * See LICENSE file for additional information.
 */

/**
 * NetSuite Units Type record  (used for 'units of measure')
 */

import * as record from 'N/record';
import { FieldType, NetsuiteRecord } from '../Record';
import { type Sublist, SublistFieldType, SublistLine } from '../Sublist';
/**
 * the "Units" sublist
 */
export class UOMSublist extends SublistLine {
	@SublistFieldType.freeformtext
	internalid: string;

	@SublistFieldType.freeformtext
	abbreviation: string;

	@SublistFieldType.checkbox
	baseunit: boolean;

	@SublistFieldType.decimalnumber
	conversionrate: number;

	@SublistFieldType.freeformtext
	pluralabbreviation: string;

	@SublistFieldType.freeformtext
	pluralname: string;

	@SublistFieldType.freeformtext
	unitname: string;
}

/**
 * NetSuite Units Type record (unitstype)
 */
export class UnitsType extends NetsuiteRecord {
	@FieldType.freeformtext
	name: string;
	@FieldType.freeformtext
	externalid: string;
	@FieldType.checkbox
	isinactive: boolean;
	@FieldType.sublist(UOMSublist)
	uom: Sublist<UOMSublist>;

	static override recordType() {
		return record.Type.UNITS_TYPE;
	}
}
