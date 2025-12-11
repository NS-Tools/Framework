/*
 * Copyright 2016-2025 Explore Consulting
 * Copyright 2025-Present NS Tools Team
 *
 * See LICENSE file for additional information.
 */

import { AliasDescriptor } from './FieldDescriptors/Record/AliasDescriptor';
import { DefaultFieldDescriptor } from './FieldDescriptors/Record/DefaultFieldDescriptor';
import { GetTextDescriptor } from './FieldDescriptors/Record/GetTextDescriptor';
import { JoinDescriptor } from './FieldDescriptors/Record/JoinDescriptor';
import { NumericDescriptor } from './FieldDescriptors/Record/NumericDescriptor';
import { SublistDescriptor } from './FieldDescriptors/Record/SublistDescriptor';
import { SubRecordDescriptor } from './FieldDescriptors/Record/SubRecordDescriptor';

export namespace FieldType {
	/**
	 * use for ns  _address_ field type
	 */
	export const address = DefaultFieldDescriptor;
	/**
	 * use for NS _checkbox_ field type - surfaces as `boolean` in TypeScript
	 */
	export const checkbox = DefaultFieldDescriptor;
	export const currency = NumericDescriptor;
	export const date = DefaultFieldDescriptor;
	export const datetime = DefaultFieldDescriptor;
	export const document = DefaultFieldDescriptor;
	export const email = DefaultFieldDescriptor;
	export const freeformtext = DefaultFieldDescriptor;

	export const float = NumericDescriptor;
	export const decimalnumber = NumericDescriptor;
	export const hyperlink = DefaultFieldDescriptor;
	export const inlinehtml = DefaultFieldDescriptor;
	export const image = DefaultFieldDescriptor;
	export const integernumber = NumericDescriptor;
	export const longtext = DefaultFieldDescriptor;
	export const multiselect = DefaultFieldDescriptor;
	export const percent = DefaultFieldDescriptor;
	export const radio = DefaultFieldDescriptor;

	/**
	 * NetSuite 'Select' field type.
	 */
	export const select = DefaultFieldDescriptor;
	export const textarea = DefaultFieldDescriptor;

	/**
	 * Netsuite helper field types
	 */
	export const getText = GetTextDescriptor;
	export const alias = AliasDescriptor;
	//export const join = JoinDescriptor;

	/**
	 * this isn't a native NS 'field' type, but rather is used to indicate a property should represent a NS sub-list.
	 * Pass a type derived from SublistLine that describes the sublist fields you want. e.g. Invoice.ItemSublistLine
	 * @example
	 * class MySublistLine extends Invoice.ItemSublistLine { custcol_foo:string }
	 * class Invoice {
	 * @FieldType.sublist(MySublistLine)
	 * item: SublistLine<MySublistLine>
	 * }
	 */
	export const sublist = SublistDescriptor;

	/**
	 * NetSuite _SubRecord_ field type (reference to a subrecord object, usually described as 'summary' in the
	 * records browser.
	 * Pass in the (TypeScript) type that matches the subrecord this property points to
	 * @example the `assemblybuild.inventorydetail` property
	 * ```typescript
	 * import { InventoryDetail } from './DataAceess/InventoryDetail'
	 *
	 * class AssemblyBuild {
	 *    @FieldType.subrecord(InventoryDetail)
	 *    inventorydetail: InventoryDetail
	 * }
	 * ```
	 */
	export const subrecord = SubRecordDescriptor;
}
