/* eslint-disable @typescript-eslint/ban-types */
import { Action } from 'store/types/Action';

export default {
  makeSetter:
    <T>() =>
    (state: T, action: Action<T>): T =>
      action.payload,
  makeMerge:
    <T extends {}>() =>
    (state: T, action: Action<Partial<T>>): T => ({
      ...state,
      ...action.payload,
    }),
  makeReset:
    <T>(initState: T) =>
    (): T =>
      initState,
  empty: (): null => null,
};
