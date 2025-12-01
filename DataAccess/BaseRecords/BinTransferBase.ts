/*
* Copyright 2016-2025 Explore Consulting
* Copyright 2025-Present NS Tools Team
*
* See LICENSE file for additional information.
*/

/**
 * Represents a Bin Transfer (bintransfer) record type in NetSuite
 */

import * as record from 'N/record';
import { FieldType, NetsuiteRecord } from '../Record';
import { type Sublist, SublistFieldType, SublistLine } from '../Sublist';

/**
 * represents the Adjustments sublist on Bin Transfer records
 */
export class AdjustmentsSublistLine extends SublistLine {
	@SublistFieldType.freeformtext
	description: string;

	@SublistFieldType.select
	item: number;

	@SublistFieldType.freeformtext
	itemunitslabel: string;

	@SublistFieldType.freeformtext
	line: string;

	@SublistFieldType.freeformtext
	preferredbin: string;

	@SublistFieldType.float
	quantity: number;
}

/**
 * NetSuite Bin Transfer record
 */
export class BinTransferBase extends NetsuiteRecord {
	static override recordType() {
		return record.Type.BIN_TRANSFER;
	}

	@FieldType.datetime
	createddate: Date;

	@FieldType.freeformtext
	externalid: string;

	@FieldType.datetime
	lastmodifieddate: Date;

	@FieldType.select
	location: number;

	@FieldType.freeformtext
	memo: string;

	@FieldType.select
	subsidiary: number;

	@FieldType.currency
	total: number;

	@FieldType.date
	trandate: Date;

	@FieldType.sublist(AdjustmentsSublistLine)
	inventory: Sublist<AdjustmentsSublistLine>;
}
