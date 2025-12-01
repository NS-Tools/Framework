/*
* Copyright 2016-2025 Explore Consulting
* Copyright 2025-Present NS Tools Team
*
* See LICENSE file for additional information.
*/

/**
 * NetSuite Inventory Count Record Type
 */

import * as record from 'N/record';
import { FieldType, NetsuiteRecord } from '../Record';
import { type Sublist, SublistFieldType, SublistLine } from '../Sublist';
/**
 * Items sublist
 */
export class ItemSublist extends SublistLine {
	@SublistFieldType.select
	item: number;
}

/**
 * NetSuite Inventory Transfer Record type
 */
export class InventoryCountBase extends NetsuiteRecord {
	static override recordType() {
		return record.Type.INVENTORY_COUNT;
	}

	@FieldType.sublist(ItemSublist)
	item: Sublist<ItemSublist>;
}
