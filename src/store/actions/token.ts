import { makeCreateActions, presetActions } from 'store/utils/Redux';
import TokenState from 'store/state/TokenState';

const ns = 'TOKEN';
const createTokenActions = makeCreateActions(ns);

const tokenActions = createTokenActions({
  authorize: presetActions.makeIdentity<TokenState>(),
  clear: presetActions.noPayload,
});

export default tokenActions;
