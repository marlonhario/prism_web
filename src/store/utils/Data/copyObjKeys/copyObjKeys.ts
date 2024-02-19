/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import mapObj from '../mapObj/mapObj';

export default <T, U extends Record<string, T>>(objMap: U, key = 'key') =>
  mapObj((obj: T, k) => ({
    [key]: k,
    ...obj,
  }))(objMap) as Record<string, T>;
