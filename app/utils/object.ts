import { transform, isObject, isEqual } from 'lodash';

/**
 * Deep diff between two object, using lodash
 * @param  {Object} object Object compared
 * @param  {Object} base   Object to compare with
 * @return {Object}        Return a new object who represent the diff
 */
export function compareObjects(object, base) {
  function changes(object, base) {
    return transform(object, function (result: any, value, key) {
      if (!isEqual(value, base[key])) {
        result[key] =
          isObject(value) && isObject(base[key])
            ? changes(value, base[key])
            : value;
      }
    });
  }
  return changes(object, base);
}

// Helper
export const StringIsNumber = value => isNaN(Number(value)) === false;
//Helper
export const StringIsNotNumber = value => isNaN(Number(value)) === true;

// Turn enum into array
export function enumToArray(enumme) {
  return Object.keys(enumme)
    .filter(StringIsNotNumber)
    .map(key => enumme[key]);
}
