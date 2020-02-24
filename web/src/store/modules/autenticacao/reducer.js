import produce from 'immer';

const INITIAL_STATE = {
  token: null,
  signed: false,
  loading: false,
};

export default function autenticacao(state = INITIAL_STATE, action) {
  switch (action.type) {
    case '@autenticacao/LOGIN_REQUEST':
      return produce(state, draft => {
        draft.loading = true;
      });

    case '@autenticacao/LOGIN_SUCCESS':
      return produce(state, draft => {
        draft.token = action.payload.token;
        draft.signed = true;
        draft.loading = false;
      });

    case '@autenticacao/LOGIN_FAILURE':
      return produce(state, draft => {
        draft.loading = false;
      });

    case '@autenticacao/LOGIN_OUT':
      return produce(state, draft => {
        draft.token = null;
        draft.signed = false;
      });

    default:
      return state;
  }
}
