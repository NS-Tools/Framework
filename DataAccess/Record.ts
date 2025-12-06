/*
* Copyright 2016-2025 Explore Consulting
* Copyright 2025-Present NS Tools Team
*
* See LICENSE file for additional information.
*/

/**
 * Defines the nsdal handling for record body fields.
 *
 */

import * as record from 'N/record';
import * as LogManager from '../utility/Logger';
import { FieldType as importFieldType } from './FieldType';

const log = LogManager.getLogger('DataAccess.Record');

// from https://www.typescriptlang.org/v2/docs/handbook/advanced-types.html#distributive-conditional-types
export type NonFunctionPropertyNames<T> = { [K in keyof T]: T[K] extends Function ? never : K }[keyof T];
// adds `null` as a union to type T. Use this to mark record properties as explicitly nullable
export type Nullable<T> = T | null;

/**
 * Since the netsuite defined 'CurrentRecord' type has almost all the same operations as the normal 'Record'
 * we use this as our base class
 */
export abstract class NetsuiteCurrentRecord {
	/**
	 * The underlying netsuite 'record' object. For client scripts, this is the slightly less feature rich
	 * 'ClientCurrentRecord' when accessing the 'current' record the script is associated to.
	 */
	nsrecord: record.Record | record.ClientCurrentRecord;

	/**
	 * Loads an existing record with the given internal id
	 * @param id record internal id to load
	 * @param isDynamic set `true` if you want to load the record in _dynamic_ mode
	 *
	 * @example
	 * // load customer with internal id 123
	 * const c = new Customer(123)
	 */
	constructor(id: NonNullable<number | string>, isDynamic?: boolean);
	/**
	 * Creates an NSDAL instance for the given existing NetSuite record object.
	 * This does NOT reload the record - it just wraps the supplied `rec`
	 * @param rec an existing netsuite record
	 *
	 * @example
	 * // assume `ctx` is the _context_ object passed to a `beforeSubmit()` entrypoint.
	 * // results in an NFT representation of the 'new record'
	 * const customer = new Customer(ctx.newRecord)
	 */
	constructor(rec: NonNullable<record.Record | record.ClientCurrentRecord>);
	/**
	 * creates a new record
	 * @param unused either `null` or leave this parameter out entirely
	 * @param isDynamic true if you want to create the record in dynamic mode, otherwise uses standard mode.
	 * @param defaultvalues optional `defaultvalues` object - specific to certain records that allow initializing a
	 * new record.
	 *
	 * @example
	 * // start a new customer record
	 * const c = new Customer()
	 *
	 * // start a new customer record in dynamic mode
	 * const c = new Customer(null, true)
	 */
	constructor(unused?: Nullable<string | number>, isDynamic?: boolean, defaultvalues?: object);

	constructor(
		rec?: null | number | string | record.Record | record.ClientCurrentRecord,
		isDynamic?: boolean,
		protected defaultValues?: object,
	) {
		// since the context of this.constructor is the derived class we're instantiating, using the line below we can
		// pull the 'static' recordType from the derived class and remove the need for derived classes to
		// define a constructor to pass the record type to super()
		const type = Object.getPrototypeOf(this).constructor.recordType();
		if (!rec) {
			// falsey values (e.g. invalid id 0, null, undefined, etc.) implies creating a new record
			log.debug('creating new record', `type:${type}  isDyanamic:${isDynamic} defaultValues:${defaultValues}`);
			this.makeRecordProp(record.create({ type: type, isDynamic: isDynamic, defaultValues: defaultValues }));
		} else if (typeof rec === 'object') {
			log.debug('using existing record', `type:${rec.type}, id:${rec.id}`);
			this.makeRecordProp(rec);
			this._id = rec.id!;
		}
		// allow
		else if (typeof rec === 'number' || +rec) {
			log.debug('loading existing record', `type:${type}, id:${rec}`);
			this.makeRecordProp(
				record.load({
					type: type,
					id: rec,
					isDynamic: isDynamic || false,
					defaultValues: defaultValues,
				}),
			);
			this._id = this.nsrecord.id!;
		} else
			throw new Error(`invalid value for argument "rec": ${rec}. 
      Must be one of: null/undefined, an internal id, or an existing record`);
	}

	/**
	 * Netsuite internal id of this record
	 * @type {number}
	 */
	protected _id: number;

	get id() {
		return this._id;
	}

	/**
	 * The netsuite record type (constant string) - this is declared here and overridden in derived classes
	 */
	static recordType(): string | record.Type {
		// the base class version of this method should never be invoked.
		return 'NetSuiteCurrentRecord:recordType not implemented. Did you forget to define a static override recordType() method on your derived class?';
	}

	toJSON() {
		// surface inherited properties on a new object so JSON.stringify() sees them all
		const result: any = { id: this._id };
		for (const key in this) {
			// NetSuite will error if you try to serialize 'Text' fields on record *create*.
			// i.e. "Invalid API usage. You must use getSublistValue to return the value set with setSublistValue."
			// As a workaround, consider this record to be in 'create' mode if there is no _id_ assigned yet
			// then skip any 'xxxxText' fields.
			if (!this._id && key.substring(key.length - 4) === 'Text') {
				// yes, this is a side effecting function inside a toJSON but this is a painful enough 'netsuiteism'
				// to justify
				log.debug(`toJSON skipping field ${key}`, `workaround to avoid NS erroring on the getText() on a new record`);
				continue;
			} else if (key.substring(0, 7) === '__join_') {
				// skip join backing properties
				log.debug(`toJSON skipping field ${key}`, `workaround to avoid NS erroring on joined pusedo fields`);
				continue;
			}

			result[key] = this[key];
		}
		return result;
	}

	/**
	 * Returns NetSuite field metadata. Useful for doing things like disabling a field on the form programmatically.
	 * @param field field name for which you want to retrieve the NetSuite field object
	 */
	getField(field: NonFunctionPropertyNames<this>) {
		return this.nsrecord.getField({
			fieldId: field as string,
		});
	}

	/**
	 * Defines a descriptor for nsrecord so as to prevent it from being enumerable. Conceptually only the
	 * field properties defined on derived classes should be seen when enumerating
	 * @param value
	 */
	private makeRecordProp = (value) => Object.defineProperty(this, 'nsrecord', { value: value });
}

/**
 * A regular netsuite record.
 */
export abstract class NetsuiteRecord extends NetsuiteCurrentRecord {
	/**
	 * underlying netsuite record
	 */
	nsrecord: record.Record;

	/**
	 * Persists this record to the NS database
	 * @param enableSourcing
	 * @param ignoreMandatoryFields
	 * @returns {number}
	 */
	save(enableSourcing?: boolean, ignoreMandatoryFields?: boolean) {
		const id = this.nsrecord.save({
			enableSourcing: enableSourcing,
			ignoreMandatoryFields: ignoreMandatoryFields,
		});
		this._id = id;
		return id;
	}
}

/**
 *  Netsuite field types - decorate your model properties with these to tie netsuite field types to your
 *  model's field type.
 *  To get 'Text' rather than field value, suffix your property name with 'Text' e.g. 'afieldText' for the
 *  field 'afield'.
 */
export import FieldType = importFieldType;
