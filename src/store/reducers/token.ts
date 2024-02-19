import { handleActions } from 'redux-actions';
import { presetReducers } from 'store/utils/Redux';
import TokenState from 'store/state/TokenState';
import { tokenActions } from '../actions';

const DEFAULT_STATE: TokenState = null;

const reducer = handleActions<TokenState, any>(
  {
    [String(tokenActions.authorize)]: presetReducers.makeSetter(),
    [String(tokenActions.clear)]: presetReducers.empty,
  },
  DEFAULT_STATE
);

export default reducer;
