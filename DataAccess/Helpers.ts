/*
* Copyright 2016-2025 Explore Consulting
* Copyright 2025-Present NS Tools Team
*
* See LICENSE file for additional information.
*/

/**
 * parses a property name from a declaration (supporting 'Text' suffix per our convention)
 * @param propertyKey original property name as declared on class
 * @returns pair consisting of a flag indicating this field wants 'text' behavior and the actual ns field name (with
 * Text suffix removed)
 */
export const parseProp = suffixParser('Text');

/**
 * returns a function for parsing property names from a declaration (e.g.
 * properties that end with 'Text' or 'Sublist' suffix per convention)
 * @param suffixToSearch string that may be at the end of a property name. this string will be strippped off
 * the end of the property name if it is present.
 * @returns function that takes a property name and returns a pair [flag indicating this field matched the suffix,
 * the stripped property name (with suffix removed)]
 */
export function suffixParser(suffixToSearch: string): (propertyKey: string) => [boolean, string] {
    const suffixLength = suffixToSearch.length;
    return (propertyKey: string) => {
        const endsWithSuffix = propertyKey.slice(-suffixLength) === suffixToSearch;
        return [endsWithSuffix, endsWithSuffix ? propertyKey.slice(0, -suffixLength) : propertyKey];
    };
}

/**
 * parses a property name from a declaration (supporting 'Sublist' suffix per convention)
 * @param propertyKey original property name as declared on class
 * @returns pair consisting of a flag indicating this is actually a sublist and the actual ns sublist name (with
 * Sublist suffix removed)
 */
export const parseSublistProp = suffixParser('Sublist');
