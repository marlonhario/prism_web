/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import mapObj from './mapObj/mapObj';
import fallback from './fallback/fallback';
import copyObjKeys from './copyObjKeys/copyObjKeys';

const distinct = (arrayA: any[], arrayB: any[]) => {
  const uniqueItems: any[] = [];
  for (let i = 0; i < Math.max(arrayA.length, arrayB.length); i += 1) {
    const a = i < arrayA.length ? arrayA[i] : null;
    const b = i < arrayB.length ? arrayB[i] : null;
    if (a && !uniqueItems.includes(a)) {
      uniqueItems.push(a);
    }
    if (b && !uniqueItems.includes(b)) {
      uniqueItems.push(b);
    }
  }
  return uniqueItems;
};

const mergeArrays = (
  arrayA: any[],
  arrayB: any[],
  mergeFunc: (itemA: any, itemB: any) => any,
  matchKeys: string[] | undefined = undefined,
  matchProp: string | undefined = 'id'
) => {
  const merged: any[] = [];
  const keys =
    matchKeys ||
    distinct(
      arrayA.map((item: any) => item[matchProp]),
      arrayB.map((item: any) => item[matchProp])
    );
  keys.forEach((key: string) => {
    const a = arrayA.find((item: any) => item[matchProp] === key);
    const b = arrayB.find((item: any) => item[matchProp] === key);
    if (a && b) merged.push(mergeFunc(a, b));
    else {
      if (a) merged.push(a);
      if (b) merged.push(b);
    }
  });
  return merged;
};

export { mergeArrays, mapObj, fallback, copyObjKeys };
