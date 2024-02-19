import { makeCreateActions, presetActions } from 'store/utils/Redux';
import { PrismState } from 'store/state/PrismState';

const ns = 'PRISM';
const createPrismActions = makeCreateActions(ns);

const prismActions = createPrismActions({
  update: presetActions.makeIdentity<Partial<PrismState>>(),
  clear: presetActions.noPayload,
});

export default prismActions;
