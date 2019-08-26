/* @flow */

export function asArray(value: any): Array<any> {
  if (value == null) return [];
  if (Array.isArray(value)) return value;
  return [value];
}
