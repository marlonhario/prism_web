/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Action } from 'redux-actions';

import { AsyncData, AsyncStatus } from 'store/types/AsyncData';
import { AppErr } from 'store/types/AppErr';
import { asyncData } from '../asyncData/asyncData';

export const createAsyncReducers = <StateType>(actionNameSnake: string) => ({
  [`${actionNameSnake}_PENDING`]: (state: AsyncData<StateType>) =>
    asyncData<StateType>(AsyncStatus.LOADING, state.data),
  [`${actionNameSnake}_FULFILLED`]: (
    state: AsyncData<StateType>,
    action: Action<StateType>
  ) => asyncData(AsyncStatus.COMPLETE, action.payload),
  [`${actionNameSnake}_REJECTED`]: (
    state: AsyncData<StateType>,
    action: Action<AppErr>
  ) => asyncData<StateType>(AsyncStatus.ERROR, action.payload, state.data),
});

export const makeCreateAsyncReducers =
  (ns: string) =>
  <StateType>(actionNameSnake: string) =>
    createAsyncReducers<StateType>(`${ns}/${actionNameSnake}`);
