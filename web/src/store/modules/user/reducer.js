import produce from 'immer';

const INITIAL_STATE = {
  profile: null,
};

export default function user(state = INITIAL_STATE, action) {
  switch (action.type) {
    case '@autenticacao/LOGIN_SUCCESS':
      return produce(state, draft => {
        draft.profile = action.payload.user;
      });
    case '@autenticacao/LOGIN_OUT':
      return produce(state, draft => {
        draft.profile = null;
      });
    default:
      return state;
  }
}
