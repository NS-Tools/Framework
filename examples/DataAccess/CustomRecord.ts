import * as log from 'N/log';
import { FieldType } from "../../DataAccess/FieldType";
import { NetsuiteRecord } from "../../DataAccess/Record";

class CustomRecord extends NetsuiteRecord {
	static override recordType() { return 'customrecord_my_custom_record';}
    
    @FieldType.freeformtext
    custrecord_name: string;
}

const myCustomRecord = new CustomRecord(123);
log.debug('custrecord_name', myCustomRecord.custrecord_name);

const myNewCustomRecord = new CustomRecord();
myNewCustomRecord.custrecord_name = 'Test Name';
const newId = myNewCustomRecord.save();
log.debug('New Custom Record ID', newId);
