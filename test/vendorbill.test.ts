import { VendorBillBase } from '../DataAccess/BaseRecords/VendorBillBase';
import { Sublist } from '../DataAccess/Sublist';

describe('vendor bill', () => {
	test('sublists exist', () => {
		const sut = new VendorBillBase();

		// should have an 'item' sublist and 'expense' sublist
		expect(sut.item).toBeInstanceOf(Sublist);
		expect(sut.expense).toBeInstanceOf(Sublist);
	});
});
