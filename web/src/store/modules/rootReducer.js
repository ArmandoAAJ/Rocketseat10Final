import { combineReducers } from 'redux';

import autenticacao from './autenticacao/reducer';
import user from './user/reducer';

export default combineReducers({
  autenticacao,
  user,
});
