import { Dispatch } from 'redux';
import _ from 'lodash';

import apiFetch, { GetSecurities } from 'services/apiFetch';
import { AppState } from 'store/state/AppState';
import { PrismState } from 'store/state/PrismState';
import { prismActions } from 'store/actions';

const populateData = async (
  dispatch: Dispatch,
  getState: () => AppState
): Promise<any> => {
  const payload: Partial<PrismState> = {};
  const securities = await apiFetch(GetSecurities).then((res) => {
    return res.data || [];
  });

  if (_.isArray(securities)) {
    payload.securities = _.sortBy(securities, (s) => s.longName);
  }

  dispatch(prismActions.update(payload));
};

export default populateData;
