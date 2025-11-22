import { DefaultDescriptor } from "./FieldDescriptors/Sublist/DefaultDescriptor";
import { NumericDescriptor } from "./FieldDescriptors/Sublist/NumericDescriptor";
import { SubRecordDescriptor } from "./FieldDescriptors/Sublist/SubRecordDescriptor";

/**
 * decorators for sublist fields. Adorn your class properties with these to bind your class property name with
 * the specific behavior for the type of field it represents in NetSuite.
 */
export namespace SublistFieldType {
    export const checkbox = DefaultDescriptor;
    export const currency = NumericDescriptor;
    export const date = DefaultDescriptor;
    export const datetime = DefaultDescriptor;
    export const email = DefaultDescriptor;
    export const freeformtext = DefaultDescriptor;
    export const decimalnumber = NumericDescriptor;
    export const float = NumericDescriptor;
    export const hyperlink = DefaultDescriptor;
    export const image = DefaultDescriptor;
    export const inlinehtml = DefaultDescriptor;
    export const integernumber = DefaultDescriptor;
    export const longtext = DefaultDescriptor;
    export const multiselect = DefaultDescriptor;

    export const namevaluelist = DefaultDescriptor;
    export const percent = DefaultDescriptor;

    export const rate = DefaultDescriptor;
    export const select = DefaultDescriptor;
    export const textarea = DefaultDescriptor;
    export const subrecord = SubRecordDescriptor;
}