/*
 * Copyright 2016-2025 Explore Consulting
 * Copyright 2025-Present NS Tools Team
 *
 * See LICENSE file for additional information.
 */

/**
 * NetSuite Blanket Purchase Order Record Type
 */

import * as record from 'N/record';
import { FieldType, NetsuiteRecord } from '../Record';
import { SublistFieldType, SublistLine } from '../Sublist';

export class ItemSublist extends SublistLine {
	@SublistFieldType.freeformtext
	description: string;

	@SublistFieldType.select
	item: number;

	@SublistFieldType.float
	quantity: number;
}

/**
 * NetSuite Blanket Purchase Order Record type
 */
export class BlanketPurchaseOrderBase extends NetsuiteRecord {
	static override recordType() {
		return record.Type.BLANKET_PURCHASE_ORDER as const;
	}

	@FieldType.select
	location: number;

	@FieldType.longtext
	memo: string;

	@FieldType.select
	subsidiary: number;

	@FieldType.date
	trandate: Date;
}
