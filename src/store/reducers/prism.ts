import { handleActions } from 'redux-actions';
import { presetReducers } from 'store/utils/Redux';
import { prismActions } from '../actions';
import {
  PrismState,
  PrismEmptyState,
} from 'store/state/PrismState';

const reducer = handleActions<PrismState, any>(
  {
    [String(prismActions.update)]: presetReducers.makeMerge(),
    [String(prismActions.clear)]:
      presetReducers.makeReset(PrismEmptyState),
  },
  PrismEmptyState
);

export default reducer;
