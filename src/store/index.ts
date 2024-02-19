import {
  applyMiddleware,
  compose,
  createStore,
  Action,
  Store,
  StoreEnhancer,
  Reducer,
  ReducersMapObject,
} from 'redux';
import {
  persistCombineReducers,
  persistStore,
  PersistConfig,
  Persistor,
} from 'redux-persist';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { useDispatch } from 'react-redux';
import promise from 'redux-promise-middleware';
import storage from 'redux-persist/lib/storage';
import reducers from './reducers';

const persistConfig: PersistConfig = {
  key: 'root',
  storage,
  whitelist: ['token'],
};
const mergeReducers: any = {
  ...reducers,
};

const combinedReducer: Reducer = persistCombineReducers(
  persistConfig,
  mergeReducers as ReducersMapObject
);

const middlewareEnhancer: StoreEnhancer = applyMiddleware(thunk, promise);

const composedEnhancers: StoreEnhancer = compose(middlewareEnhancer);

const store: Store = createStore(combinedReducer, composedEnhancers);
const persistor = persistStore(store);

type ThunkDispatchType = ThunkDispatch<typeof store, any, Action>;
const useThunkDispatch = (): ThunkDispatchType =>
  useDispatch<ThunkDispatchType>();

export { useThunkDispatch };

export default {
  store,
  persistor,
};
