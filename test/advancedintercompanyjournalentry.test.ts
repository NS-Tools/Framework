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
