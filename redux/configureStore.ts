import { loggingMiddleware } from 'redoodle';
import { applyMiddleware, createStore, StoreEnhancer } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { PersistedState, persistReducer, persistStore } from 'redux-persist';
import promise from 'redux-promise-middleware';
import AsyncStorage from '@react-native-community/async-storage';
import { initialState } from './initialState';
import { rootReducer } from './reducers';

const composeEnhancers = composeWithDevTools({
  name: 'restaurant-recommendations',
});

const enhancers = composeEnhancers(
  applyMiddleware(
    promise,
    loggingMiddleware({
      enableInProduction: false,
    }),
  ),
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
) as StoreEnhancer<any>;

export type PersistedAppState = PersistedState;

const persistConfig = {
  storage: AsyncStorage,
  key: 'root',
};
const persistedReducer = persistReducer<any>(persistConfig, rootReducer);

export const store = createStore(persistedReducer, initialState, enhancers);

export const persistor = persistStore(store);
