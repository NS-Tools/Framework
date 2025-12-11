/*
 * Copyright 2016-2025 Explore Consulting
 * Copyright 2025-Present NS Tools Team
 *
 * See LICENSE file for additional information.
 */

/**
 *  Represents an Intercompany Transfer Order (intercompanytransferorder) transaction type in NetSuite
 */

import * as record from 'N/record';
import { FieldType } from '../Record';
import { SublistFieldType, SublistLine } from '../Sublist';
import * as to from './TransferOrderBase';

/**
 * NetSuite Intercompany Transfer Order Record
 * Primary difference between this an a regular Transfer order is a TO destination subsidiary.
 */
export class IntercompanyTransferOrderBase extends to.TransferOrderBase {
	static override recordType() {
		return record.Type.INTER_COMPANY_TRANSFER_ORDER;
	}

	@FieldType.select
	tosubsidiary: number;
}

/**
 * Sublist 'item' on the Intercompany Tranfer Order record (same as on regular Transfer Order)
 */
export class ItemSublist extends to.ItemSublist {}
