/*
 * Copyright 2016-2025 Explore Consulting
 * Copyright 2025-Present NS Tools Team
 *
 * See LICENSE file for additional information.
 */

import * as record from 'N/record';
import { FieldType, NetsuiteRecord } from '../Record';

/**
 * NetSuite Department record type
 */
export class DepartmentBase extends NetsuiteRecord {
	/**
	 * External ID
	 */
	@FieldType.freeformtext
	externalid: string;

	/**
	 * Include Children
	 */
	@FieldType.checkbox
	includechildren: boolean;

	/**
	 * Is Inactive
	 */
	@FieldType.checkbox
	isinactive: boolean;

	/**
	 * Name
	 */
	@FieldType.freeformtext
	name: string;

	/**
	 * Name No Hierarchy
	 */
	@FieldType.freeformtext
	namenohierarchy: string;

	/**
	 * Parent
	 */
	@FieldType.select
	parent: number;

	/**
	 * Subsidiary
	 */
	@FieldType.multiselect
	subsidiary: number[];

	static override recordType() {
		return record.Type.DEPARTMENT;
	}
}
