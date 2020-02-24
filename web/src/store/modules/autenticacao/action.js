export function loginRequest(email, password) {
  return {
    type: '@autenticacao/LOGIN_REQUEST',
    payload: { email, password },
  };
}

export function loginSuccess(token, user) {
  return {
    type: '@autenticacao/LOGIN_SUCCESS',
    payload: { token, user },
  };
}

export function loginFailure() {
  return {
    type: '@autenticacao/LOGIN_FAILURE',
  };
}

export function loginOut() {
  return {
    type: '@autenticacao/LOGIN_OUT',
  };
}
