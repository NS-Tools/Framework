var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./Record", "N/record"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ShipItemBase = void 0;
    const Record_1 = require("./Record");
    const record = require("N/record");
    /**
     * Ship Item base class
     */
    class ShipItemBase extends Record_1.NetsuiteRecord {
        static recordType() { return record.Type.SHIP_ITEM; }
    }
    exports.ShipItemBase = ShipItemBase;
    __decorate([
        Record_1.FieldType.checkbox
    ], ShipItemBase.prototype, "accchange", void 0);
    __decorate([
        Record_1.FieldType.select
    ], ShipItemBase.prototype, "account", void 0);
    __decorate([
        Record_1.FieldType.select
    ], ShipItemBase.prototype, "accounthandling", void 0);
    __decorate([
        Record_1.FieldType.radio
    ], ShipItemBase.prototype, "costbasis", void 0);
    __decorate([
        Record_1.FieldType.select
    ], ShipItemBase.prototype, "countries", void 0);
    __decorate([
        Record_1.FieldType.textarea
    ], ShipItemBase.prototype, "description", void 0);
    __decorate([
        Record_1.FieldType.freeformtext
    ], ShipItemBase.prototype, "displayname", void 0);
    __decorate([
        Record_1.FieldType.freeformtext
    ], ShipItemBase.prototype, "doifarrangement", void 0);
    __decorate([
        Record_1.FieldType.checkbox
    ], ShipItemBase.prototype, "doiftotal", void 0);
    __decorate([
        Record_1.FieldType.currency
    ], ShipItemBase.prototype, "doiftotalamt", void 0);
    __decorate([
        Record_1.FieldType.select
    ], ShipItemBase.prototype, "doiftotaloperator", void 0);
    __decorate([
        Record_1.FieldType.checkbox
    ], ShipItemBase.prototype, "doifweight", void 0);
    __decorate([
        Record_1.FieldType.currency
    ], ShipItemBase.prototype, "doifweightamt", void 0);
    __decorate([
        Record_1.FieldType.select
    ], ShipItemBase.prototype, "doifweightoperator", void 0);
    __decorate([
        Record_1.FieldType.select
    ], ShipItemBase.prototype, "doifweightunit", void 0);
    __decorate([
        Record_1.FieldType.freeformtext
    ], ShipItemBase.prototype, "edition", void 0);
    __decorate([
        Record_1.FieldType.checkbox
    ], ShipItemBase.prototype, "excludecountries", void 0);
    __decorate([
        Record_1.FieldType.checkbox
    ], ShipItemBase.prototype, "excludesites", void 0);
    __decorate([
        Record_1.FieldType.freeformtext
    ], ShipItemBase.prototype, "externalid", void 0);
    __decorate([
        Record_1.FieldType.float
    ], ShipItemBase.prototype, "fedexdiscountrate", void 0);
    __decorate([
        Record_1.FieldType.checkbox
    ], ShipItemBase.prototype, "fedexonerate", void 0);
    __decorate([
        Record_1.FieldType.select
    ], ShipItemBase.prototype, "fedexservicecode", void 0);
    __decorate([
        Record_1.FieldType.currency
    ], ShipItemBase.prototype, "freeifordertotalisoveramount", void 0);
    __decorate([
        Record_1.FieldType.percent
    ], ShipItemBase.prototype, "handlingaspercentageoftotal", void 0);
    __decorate([
        Record_1.FieldType.currency
    ], ShipItemBase.prototype, "handlingbyweightamount", void 0);
    __decorate([
        Record_1.FieldType.float
    ], ShipItemBase.prototype, "handlingbyweightperquantity", void 0);
    __decorate([
        Record_1.FieldType.select
    ], ShipItemBase.prototype, "handlingbyweightperunit", void 0);
    __decorate([
        Record_1.FieldType.radio
    ], ShipItemBase.prototype, "handlingcost", void 0);
    __decorate([
        Record_1.FieldType.currency
    ], ShipItemBase.prototype, "handlingflatrateamount", void 0);
    __decorate([
        Record_1.FieldType.currency
    ], ShipItemBase.prototype, "handlingperitemamount", void 0);
    __decorate([
        Record_1.FieldType.select
    ], ShipItemBase.prototype, "handlingtablechargeby", void 0);
    __decorate([
        Record_1.FieldType.select
    ], ShipItemBase.prototype, "handlingtableuom", void 0);
    __decorate([
        Record_1.FieldType.select
    ], ShipItemBase.prototype, "handlingtaxcode", void 0);
    __decorate([
        Record_1.FieldType.checkbox
    ], ShipItemBase.prototype, "hasmaximumshippingcost", void 0);
    __decorate([
        Record_1.FieldType.checkbox
    ], ShipItemBase.prototype, "hasminimumshippingcost", void 0);
    __decorate([
        Record_1.FieldType.freeformtext
    ], ShipItemBase.prototype, "integratedlabelsarrangement", void 0);
    __decorate([
        Record_1.FieldType.select
    ], ShipItemBase.prototype, "integrationservicecode", void 0);
    __decorate([
        Record_1.FieldType.freeformtext
    ], ShipItemBase.prototype, "invt_dispname", void 0);
    __decorate([
        Record_1.FieldType.checkbox
    ], ShipItemBase.prototype, "isfreeifordertotalisover", void 0);
    __decorate([
        Record_1.FieldType.checkbox
    ], ShipItemBase.prototype, "ishandlingbyweightbracketed", void 0);
    __decorate([
        Record_1.FieldType.checkbox
    ], ShipItemBase.prototype, "ishandlingtaxable", void 0);
    __decorate([
        Record_1.FieldType.checkbox
    ], ShipItemBase.prototype, "isinactive", void 0);
    __decorate([
        Record_1.FieldType.checkbox
    ], ShipItemBase.prototype, "isonline", void 0);
    __decorate([
        Record_1.FieldType.checkbox
    ], ShipItemBase.prototype, "isshippingbyweightbracketed", void 0);
    __decorate([
        Record_1.FieldType.checkbox
    ], ShipItemBase.prototype, "istaxable", void 0);
    __decorate([
        Record_1.FieldType.freeformtext
    ], ShipItemBase.prototype, "itemid", void 0);
    __decorate([
        Record_1.FieldType.freeformtext
    ], ShipItemBase.prototype, "itemtype", void 0);
    __decorate([
        Record_1.FieldType.freeformtext
    ], ShipItemBase.prototype, "labelplugin", void 0);
    __decorate([
        Record_1.FieldType.select
    ], ShipItemBase.prototype, "labelpluginselect", void 0);
    __decorate([
        Record_1.FieldType.freeformtext
    ], ShipItemBase.prototype, "labelreg", void 0);
    __decorate([
        Record_1.FieldType.select
    ], ShipItemBase.prototype, "labelregselect", void 0);
    __decorate([
        Record_1.FieldType.freeformtext
    ], ShipItemBase.prototype, "labelservice", void 0);
    __decorate([
        Record_1.FieldType.freeformtext
    ], ShipItemBase.prototype, "labelservicegroup", void 0);
    __decorate([
        Record_1.FieldType.select
    ], ShipItemBase.prototype, "labelservicegroupselect", void 0);
    __decorate([
        Record_1.FieldType.select
    ], ShipItemBase.prototype, "labelserviceselect", void 0);
    __decorate([
        Record_1.FieldType.radio
    ], ShipItemBase.prototype, "labeltype", void 0);
    __decorate([
        Record_1.FieldType.currency
    ], ShipItemBase.prototype, "maximumshippingcost", void 0);
    __decorate([
        Record_1.FieldType.currency
    ], ShipItemBase.prototype, "minimumshippingcost", void 0);
    __decorate([
        Record_1.FieldType.checkbox
    ], ShipItemBase.prototype, "needsallfreeshippingitems", void 0);
    __decorate([
        Record_1.FieldType.checkbox
    ], ShipItemBase.prototype, "omitpackaging", void 0);
    __decorate([
        Record_1.FieldType.freeformtext
    ], ShipItemBase.prototype, "pluginlabelsarrangement", void 0);
    __decorate([
        Record_1.FieldType.freeformtext
    ], ShipItemBase.prototype, "pluginratearrangement", void 0);
    __decorate([
        Record_1.FieldType.freeformtext
    ], ShipItemBase.prototype, "ratingplugin", void 0);
    __decorate([
        Record_1.FieldType.select
    ], ShipItemBase.prototype, "ratingpluginselect", void 0);
    __decorate([
        Record_1.FieldType.freeformtext
    ], ShipItemBase.prototype, "ratingreg", void 0);
    __decorate([
        Record_1.FieldType.select
    ], ShipItemBase.prototype, "ratingregselect", void 0);
    __decorate([
        Record_1.FieldType.freeformtext
    ], ShipItemBase.prototype, "ratingservice", void 0);
    __decorate([
        Record_1.FieldType.freeformtext
    ], ShipItemBase.prototype, "ratingservicegroup", void 0);
    __decorate([
        Record_1.FieldType.select
    ], ShipItemBase.prototype, "ratingservicegroupselect", void 0);
    __decorate([
        Record_1.FieldType.select
    ], ShipItemBase.prototype, "ratingserviceselect", void 0);
    __decorate([
        Record_1.FieldType.freeformtext
    ], ShipItemBase.prototype, "restrictionarrangement", void 0);
    __decorate([
        Record_1.FieldType.freeformtext
    ], ShipItemBase.prototype, "returnlabelreg", void 0);
    __decorate([
        Record_1.FieldType.select
    ], ShipItemBase.prototype, "returnlabelregselect", void 0);
    __decorate([
        Record_1.FieldType.freeformtext
    ], ShipItemBase.prototype, "returnlabelservice", void 0);
    __decorate([
        Record_1.FieldType.select
    ], ShipItemBase.prototype, "returnlabelserviceselect", void 0);
    __decorate([
        Record_1.FieldType.select
    ], ShipItemBase.prototype, "returnservicecode", void 0);
    __decorate([
        Record_1.FieldType.checkbox
    ], ShipItemBase.prototype, "returnsintegrated", void 0);
    __decorate([
        Record_1.FieldType.freeformtext
    ], ShipItemBase.prototype, "shipitemcurrency", void 0);
    __decorate([
        Record_1.FieldType.checkbox
    ], ShipItemBase.prototype, "shipperintegrated", void 0);
    __decorate([
        Record_1.FieldType.percent
    ], ShipItemBase.prototype, "shippingaspercentageoftotal", void 0);
    __decorate([
        Record_1.FieldType.currency
    ], ShipItemBase.prototype, "shippingbyweightamount", void 0);
    __decorate([
        Record_1.FieldType.float
    ], ShipItemBase.prototype, "shippingbyweightperquantity", void 0);
    __decorate([
        Record_1.FieldType.select
    ], ShipItemBase.prototype, "shippingbyweightperunit", void 0);
    __decorate([
        Record_1.FieldType.freeformtext
    ], ShipItemBase.prototype, "shippingcarrier", void 0);
    __decorate([
        Record_1.FieldType.currency
    ], ShipItemBase.prototype, "shippingflatrateamount", void 0);
    __decorate([
        Record_1.FieldType.currency
    ], ShipItemBase.prototype, "shippingperitemamount", void 0);
    __decorate([
        Record_1.FieldType.select
    ], ShipItemBase.prototype, "shippingtablechargeby", void 0);
    __decorate([
        Record_1.FieldType.select
    ], ShipItemBase.prototype, "shippingtableuom", void 0);
    __decorate([
        Record_1.FieldType.select
    ], ShipItemBase.prototype, "shippingtaxcode", void 0);
    __decorate([
        Record_1.FieldType.select
    ], ShipItemBase.prototype, "site", void 0);
    __decorate([
        Record_1.FieldType.select
    ], ShipItemBase.prototype, "states", void 0);
    __decorate([
        Record_1.FieldType.select
    ], ShipItemBase.prototype, "subsidiary", void 0);
    __decorate([
        Record_1.FieldType.freeformtext
    ], ShipItemBase.prototype, "tabtext", void 0);
    __decorate([
        Record_1.FieldType.select
    ], ShipItemBase.prototype, "taxschedule", void 0);
    __decorate([
        Record_1.FieldType.select
    ], ShipItemBase.prototype, "taxschedulehandling", void 0);
    __decorate([
        Record_1.FieldType.float
    ], ShipItemBase.prototype, "upsdiscountrate", void 0);
    __decorate([
        Record_1.FieldType.freeformtext
    ], ShipItemBase.prototype, "upssavername", void 0);
    __decorate([
        Record_1.FieldType.select
    ], ShipItemBase.prototype, "upsservicecode", void 0);
    __decorate([
        Record_1.FieldType.float
    ], ShipItemBase.prototype, "uspsdiscountrate", void 0);
    __decorate([
        Record_1.FieldType.select
    ], ShipItemBase.prototype, "uspsservicecode", void 0);
});
