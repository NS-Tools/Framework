/*
* Copyright 2016-2025 Explore Consulting
* Copyright 2025-Present NS Tools Team
*
* See LICENSE file for additional information.
*/

/**
 * Represents an Customer Message (customermessage) record type in NetSuite
 */

import * as record from 'N/record';
import { FieldType, NetsuiteRecord } from '../Record';

/**
 * Customer Message (customermessage) Base Type
 */
export class CustomerMessageBase extends NetsuiteRecord {
	static override recordType() {
		return record.Type.CUSTOMER_MESSAGE;
	}

	@FieldType.textarea
	description: string;

	@FieldType.freeformtext
	externalid: string;

	@FieldType.checkbox
	isinactive: boolean;

	@FieldType.freeformtext
	name: string;

	@FieldType.checkbox
	preferred: boolean;
}
