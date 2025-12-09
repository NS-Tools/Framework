/*
* Copyright 2016-2025 Explore Consulting
* Copyright 2025-Present NS Tools Team
*
* See LICENSE file for additional information.
*/

/**
 * Test file for SuiteScript 2.0
 * @NApiVersion 2.x
 * @NScriptType Suitelet
 */

/*
this line adds lodash it as a silent dependency of this
module (in the correct path of ./lodash assuming lodash is installed in the same folder as this script)
*/

import { CustomerBase } from './DataAccess/BaseRecords/CustomerBase';
import { ItemSublist, SalesOrderBase } from './DataAccess/BaseRecords/SalesOrderBase';
import { FieldType, NetsuiteRecord } from './DataAccess/Record';
import type { Sublist } from './DataAccess/Sublist';
import * as LogManager from './utility/Logger';

const log = LogManager.DefaultLogger;

class Customer extends CustomerBase {
	// just add 'Text' to the property name to get/set text value. 'subsidiary' property still exists
	// as the internal id value
	@FieldType.select
	subsidiaryText: string;


	// Field alias example.
	@FieldType.checkbox
	custentity1: boolean;

	// You can now use cust.is_preferred_customer to read/write the value of custentity1
	@FieldType.alias('custentity1') is_preferred_customer: boolean;
}

// the SalesOrderBase class has the item sublist fields already defined.
// you add fields that aren't already in SalesOrderBase here (e.g. custom fields, some less frequently used native fields)
class SalesOrder extends SalesOrderBase {
	@FieldType.sublist(ItemSublist)
	override item: Sublist<ItemSublist>;
}

// Example Custom Record definition
// see the CodeGeneration/ folder for ways to autogenerate classes for your custom records.
class MyCustomRecord extends NetsuiteRecord {
	static override recordType() {
		return 'customrecord_myrecordid';
	}

	@FieldType.freeformtext
	custrecord_some_text: string;
}

function demoCustomRecord() {
	// custom records work just like native records with NSDAL.
	const customRec = new MyCustomRecord(123);
	customRec.custrecord_some_text = 'hello world';
	customRec.save();
}

function demoSalesOrderLineItems() {
	// load sales order internal id 123
	const so = new SalesOrder(123);

	// just some contrived examples to illustrate the ease of using the item sublist as an array

	// access first line item
	so.item[0].quantity = 1;

	// you can also access the item row when saved as a variable reference - shorter code
	const line = so.item[0];
	line.rate = 20;

	// get all line items over $50 amount 
	let hasLinesover50 = false;
	for (const item of so.item) {
		if (item.amount > 50.0) {
			hasLinesover50 = true;
			// do something with item
		}
	}

	if (!hasLinesover50) {
		// do something if no lines over $50
	}

	// increase quantity by 1 for all lines
	for (const item of so.item) {
		item.quantity += 1;
	}

	// find first line item with specific item
	let firstLineWithItem123: ItemSublist | undefined;
	for (const item of so.item) {
		if (item.item === 123) {
			firstLineWithItem123 = item;
			break;
		}
	}

	if (firstLineWithItem123) {
		// do something with found line
		firstLineWithItem123.quantity += 1;
	}

	// ... can then access fields on the found line...
	// found.quantity
	// found.rate
	// found.itemtype
	// found.description
	// etc.

	// add a line item to end of sublist
	const newLine = so.item.addLine();
	newLine.item = 123;
	newLine.quantity = 1;

	// insert a line in the middle of the list
	const inserted = so.item.addLine(true, 2);
	inserted.item = 123;
	inserted.quantity = 2;
}

function sublistExamples() {
	// load sales order internal id 123 _in dynamic mode_
	const so = new SalesOrder(123, true);

	// access first line item - this will use `setCurrentSublistValue()` since we're in dynamic mode.
	// NOTE: records not `isDynamic = true` will use _standard mode_ APIs
	so.item[0].quantity = 1;

	// disable the default dynamic mode API usage - fall back to standard mode instead, even though our underlying
	// NetSuite record is in dynamic mode.
	so.item.useDynamicModeAPI = false;
	so.item[0].quantity = 1; // uses standard mode api `setSublistValue()`
	so.item.useDynamicModeAPI = true; // restore allowing dynamic mode API use.
}

export = {
	onRequest: (/*req,  resp */) => {
		const c = new Customer(227);

		log.info('subsidiary value', c.subsidiary);
		log.info('subsidiary text', c.subsidiaryText);

		c.comments = c.comments + Math.random().toString();
		log.warn('warning', 'this is a warning');
		log.info('customer', c);
		const id = c.save();
		log.debug(`saved record id: ${id}`);
		demoSalesOrderLineItems();
		demoCustomRecord();
		sublistExamples();
	},
};
