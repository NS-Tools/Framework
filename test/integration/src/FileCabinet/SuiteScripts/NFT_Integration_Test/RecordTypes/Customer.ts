/*
* Copyright 2016-2025 Explore Consulting
* Copyright 2025-Present NS Tools Team
*
* See LICENSE file for additional information.
*/

import { CustomerBase } from '../NFT-SS2-8.0.1/DataAccess/CustomerBase';
import { FieldType } from '../NFT-SS2-8.0.1/DataAccess/Record';

/**
 * NetSuite Customer record type
 */
export class Customer extends CustomerBase {
	/**
	 * a wonderful datetime field used for some glorious purpose (just an example - remove in real project)
	 */
	@FieldType.datetime
	custentity_delete_me: Date | null;
}
