/*
* Copyright 2016-2025 Explore Consulting
* Copyright 2025-Present NS Tools Team
*
* See LICENSE file for additional information.
*/

/**
 * Company           RSM US LLP
 * Description       A script for smoke-testing NFT. These tests are not meant to be exhaustive, but rather to ensure that the basic functionality of NFT is working.
 * Developed against some account specific data - therefore you will likely need to change some record internal id
 * references to run this on your account.
 * @NApiVersion 2.1
 * @NScriptType Suitelet
 **/

import * as search from 'N/search';
import type { EntryPoints } from 'N/types';
import { BigNumber } from './NFT-SS2-8.0.1/bignumber';
import { AddressBase } from './NFT-SS2-8.0.1/DataAccess/AddressBase';
import { ItemFulfillmentBase } from './NFT-SS2-8.0.1/DataAccess/ItemFulfillmentBase';
import { FieldType } from './NFT-SS2-8.0.1/DataAccess/Record';
import { ServiceItemBase } from './NFT-SS2-8.0.1/DataAccess/ServiceItemBase';
import * as LogManager from './NFT-SS2-8.0.1/EC_Logger';
import { Seq } from './NFT-SS2-8.0.1/immutable';
import * as _ from './NFT-SS2-8.0.1/lodash';
import { LazyQuery, nsQueryResult2obj } from './NFT-SS2-8.0.1/query';
import { getColumns } from './NFT-SS2-8.0.1/queryAutoMapper';
import { LazySearch, nsSearchResult2obj } from './NFT-SS2-8.0.1/search';
import { Customer } from './RecordTypes/Customer';
import { VendorPayment } from './RecordTypes/VendorPayment';

const log = LogManager.DefaultLogger;

class ItemFulfillment extends ItemFulfillmentBase {
	@FieldType.subrecord(AddressBase)
	shippingaddress: AddressBase;
}

namespace X {
	/**
	 * main script entrypoint
	 */
	export function onRequest(ctx: EntryPoints.Suitelet.onRequestContext) {
		LogManager.getLogger(LazySearch.LOGNAME).setLevel(LogManager.logLevel.debug);

		switch (ctx.request.method) {
			case 'GET':
				ctx.response.writeLine({ output: `<H1>NFT Integration Tests</H1>` });
				for (const test in testMap) {
					ctx.response.writeLine({ output: `<H2>${test}</H2>` });
					ctx.response.write(`<pre>${JSON.stringify(testMap[test](), null, 2)}</pre>`);
				}
				break;
			case 'POST':
				log.debug('POST request parms', ctx.request.parameters);
				break;
		}
	}

	/**
	 * Ensure we can use the node-sql-parser to parse a SQL string and get columns
	 */
	export function autoMapping() {
		const sqlStr = `SELECT id, trandate FROM transaction WHERE id = 1000`;
		return getColumns(sqlStr);
	}

	export function autoMappingAvancedQuery() {
		const sqlStr = `SELECT TOP 1 t.id, t.trandate as tdate,
                             (SELECT TOP 1 c.id FROM customer as c WHERE c.id = t.entity) as customerid,
                             TO_CHAR(t.trandate, 'MM/DD/YYYY'),
                             TO_CHAR(t.trandate, 'MM/DD/YYYY')                            as otherdate
                      FROM transaction as t
                      WHERE id = 1000 AND (SELECT TOP 1 c.id FROM customer as c WHERE c.id = t.entity ) IS NOT NULL`;
		return getColumns(sqlStr);
	}

	/**
	 * ensure we can load an assembly item  now that it uses the shared `Item` base class
	 */
	export function loadAssemblyItem() {
		return new ServiceItemBase(286);
	}

	/**
	 * Tests that NFT can load a specific transaction
	 */
	export function loadTransaction() {
		return new ItemFulfillment(34090);
	}

	export function loadEntity() {
		return new Customer(329);
	}

	export function doSearch() {
		return Seq(
			LazySearch.from(
				search.create({
					type: search.Type.CUSTOMER,
					filters: [['companyname', search.Operator.STARTSWITH, 'e']],
					columns: ['companyname', 'phone', 'firstname', 'lastname'],
					// as any below because two physically separate declarations of N/search (one referenced by LazySearch.from() expected parameters,
					// the other being the argument value created by search.create() here in this script.
					// are viewed as incompatible by TS
				}),
				2,
			),
		)
			.map(nsSearchResult2obj<{ foo: string }>())
			.toArray();
	}

	export function doQueryBasic() {
		return Seq(LazyQuery.from({ query: `SELECT ID AS FOO FROM TRANSACTION WHERE ROWNUM < 10` }))
			.map(
				nsQueryResult2obj<{
					foo: number;
				}>,
			)
			.toArray();
	}

	export function doQueryParam() {
		return Seq(
			LazyQuery.from(
				{
					query: `SELECT ID AS FOO FROM TRANSACTION WHERE recordType = ?`,
					params: ['invoice'],
				},
				10,
			),
		)
			.take(25)
			.map(nsQueryResult2obj)
			.toArray();
	}

	export function doQueryPageSize() {
		return Seq(LazyQuery.from({ query: `SELECT ID AS FOO FROM TRANSACTION WHERE ROWNUM < 10` }, 750))
			.map(nsQueryResult2obj)
			.toArray();
	}

	export function doQueryPageSizeParam() {
		return Seq(
			LazyQuery.from(
				{
					query: `SELECT ID AS FOO FROM TRANSACTION WHERE recordType = ? AND ROWNUM < 10`,
					params: ['invoice'],
				},
				750,
			),
		)
			.map(nsQueryResult2obj)
			.toArray();
	}

	export function sublists() {
		const v = new VendorPayment(32017);

		v.apply.useDynamicModeAPI = false;
		const applySublist = _.toPlainObject(v.apply);

		v.apply.useDynamicModeAPI = true;
		// should be the same because the record was in standard mode all along
		const applySublist2 = _.toPlainObject(v.apply);

		const customerAddress = new Customer(329).addressbook;

		return { standardModeResult: applySublist, standardModeResult2: applySublist2, customerAddress };
	}

	export function autoLogging() {
		log.info('autologging');
		// this should log an object for entry/exit
		X.foo({ x: 'hello' });

		// should log a primitive number for entry/exit
		X.bar(200);

		return 'see execution log for details';
	}

	export function basicLodash() {
		return [
			{
				msg: '_.filter() greater than 3',
				result: _.filter([2, 3, 4, 6], (x) => x > 3),
			},
			{
				msg: '_.map 1,2,3 add 1',
				result: _.map([1, 2, 3], (x) => x + 1),
			},
		];
	}

	/**
	 * Just a compilation check to ensure BigNumber is usable
	 * and runs in netsuite
	 */
	export function bignumberCheck() {
		const b = new BigNumber(3.14159);
		return b.multipliedBy(2).toFixed(4);
	}

	export function foo(obj: { x: string }) {
		obj.x += 'world';
		return obj;
	}

	export function bar(i: number) {
		return i + 5;
	}

	export const testMap: { [label: string]: Function } = {
		'NSDAL load Transaction': X.loadTransaction,
		'NSDAL load Inventory Item': X.loadAssemblyItem,
		'NSDAL load Customer': X.loadEntity,
		'NSDAL sublists': X.sublists,
		LazySearch: X.doSearch,
		'LazyQuery Basic': X.doQueryBasic,
		'LazyQuery Param': X.doQueryParam,
		'LazyQuery Paged': X.doQueryPageSize,
		'LazyQuery No page, Params': X.doQueryPageSizeParam,
		AutoLogging: X.autoLogging,
		BasicLodash: X.basicLodash,
		AutoMapping: X.autoMapping,
		AutoMappingAdvanced: X.autoMappingAvancedQuery,
		'BigNumber Sanity': X.bignumberCheck,
	};
}

LogManager.autoLogMethodEntryExit(
	{ target: X.testMap, method: /\w+/ },
	{
		withGovernance: true,
		withProfiling: true,
	},
);

export = { onRequest: X.onRequest };
