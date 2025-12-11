/*
 * Copyright 2016-2025 Explore Consulting
 * Copyright 2025-Present NS Tools Team
 *
 * See LICENSE file for additional information.
 */

/**
 * NetSuite Work Order Close Record Type
 */

import { FieldType, NetsuiteRecord } from '../Record';
import { type Sublist, SublistLine } from '../Sublist';

export class ComponentSublist extends SublistLine {}

/**
 * NetSuite Work Order Close Record type
 */
export class WorkOrderCloseBase extends NetsuiteRecord {
	@FieldType.sublist(ComponentSublist)
	component: Sublist<ComponentSublist>;
}
