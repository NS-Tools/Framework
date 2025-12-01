/*
* Copyright 2016-2025 Explore Consulting
* Copyright 2025-Present NS Tools Team
*
* See LICENSE file for additional information.
*/

import {
	AdvancedIntercompanyJournalEntryBase,
	LineSublist,
} from '../DataAccess/BaseRecords/AdvancedIntercompanyJournalEntryBase';
import { Sublist } from '../DataAccess/Sublist';

describe('advanced intercompany journal entry', () => {
	test('sublists exist', () => {
		const sut = new AdvancedIntercompanyJournalEntryBase();

		// should have an 'line' sublist
		expect(sut.line).toBeInstanceOf(Sublist);
	});
});
