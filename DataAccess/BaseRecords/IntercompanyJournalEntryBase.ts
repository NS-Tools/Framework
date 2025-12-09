/*
* Copyright 2016-2025 Explore Consulting
* Copyright 2025-Present NS Tools Team
*
* See LICENSE file for additional information.
*/

/**
 * NS Base intercompany journal entry record (intercompanyjournalentry) - contains definitions for fields and sublists
 */

import * as record from 'N/record';
import { FieldType } from '../Record';
import { type Sublist, SublistFieldType } from '../Sublist';
import { LineSublist as JeLineSublist, JournalEntryBase } from './JournalEntryBase';

/**
 * Intercompany Journal Entry Line (line) sublist
 */
export class LineSublist extends JeLineSublist {
	/**
	 * the line-level subsidiary - this is a difference between normal journal entry and intercompany JE
	 */
	@SublistFieldType.select
	linesubsidiary?: number;
}

/**
 * defines an Inter-company journal entry (basically identical to a normal journal entry?)
 */
export class IntercompanyJournalEntryBase extends JournalEntryBase {
	static override recordType() {
		return record.Type.INTER_COMPANY_JOURNAL_ENTRY;
	}

	@FieldType.sublist(LineSublist)
	override line: Sublist<LineSublist>;
}
