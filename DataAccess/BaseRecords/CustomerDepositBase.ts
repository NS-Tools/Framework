/*
 * Copyright 2016-2025 Explore Consulting
 * Copyright 2025-Present NS Tools Team
 *
 * See LICENSE file for additional information.
 */

/**
 * Base Customer Deposit (customerdeposit) definition
 */

import * as record from 'N/record';
import { FieldType } from '../Record';
import { TransactionBase } from './Transaction';

/**
 * NetSuite Customer Deposit Record 'customerdeposit'
 */
export class CustomerDepositBase extends TransactionBase {
	static override recordType() {
		return record.Type.CUSTOMER_DEPOSIT;
	}

	@FieldType.select
	account: number;

	@FieldType.select
	currency: number;

	@FieldType.select
	customer: number;

	@FieldType.select
	paymentmethod: number;

	@FieldType.select
	salesorder: number;

	@FieldType.currency
	payment: string;
}
