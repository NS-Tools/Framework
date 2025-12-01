/*
* Copyright 2016-2025 Explore Consulting
* Copyright 2025-Present NS Tools Team
*
* See LICENSE file for additional information.
*/

/**
 * Represents a Vendor-Subsidiary Relationship record in NetSuite
 */

import * as record from 'N/record';
import { FieldType, NetsuiteRecord } from '../Record';

/**
 * Vendor-Subsidiary Relationship Record Type
 */
export class VendorSubsidiaryRelationshipBase extends NetsuiteRecord {
	static override recordType() {
		return record.Type.VENDOR_SUBSIDIARY_RELATIONSHIP;
	}
	@FieldType.currency
	balance: string;

	@FieldType.currency
	balancebase: string;

	@FieldType.freeformtext
	basecurrency: string;

	@FieldType.currency
	creditlimit: string;

	@FieldType.select
	entity: number;

	@FieldType.freeformtext
	externalid: string;

	@FieldType.checkbox
	isprimarysub: boolean;

	@FieldType.freeformtext
	primarycurrency: string;

	@FieldType.select
	subsidiary: number;

	@FieldType.select
	taxitem: number;

	@FieldType.currency
	unbilledorders: string;

	@FieldType.currency
	unbilledordersbase: string;
}
