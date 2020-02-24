import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

export default reducers => {
  const persistedReducer = persistReducer(
    {
      key: 'FASTFEET',
      storage,
      whitelist: ['autenticacao', 'user'],
    },
    reducers
  );
  return persistedReducer;
};
