import { Alert } from 'react-native';

import { takeLatest, call, put, all } from 'redux-saga/effects';

import api from '~/services/api';

import { signInSuccess, signFailure } from './actions';

export function* singIn({ payload }) {
  try {
    const { id } = payload;

    const response = yield call(api.get, `deliverymans/${id}`);
    const profile = {
      id: response.data.id,
      name: response.data.name,
      email: response.data.email,
      avatar: response.data.avatar,
      date_register: response.data.createdAt,
    };

    yield put(signInSuccess(id, profile));
  } catch (err) {
    Alert.alert('Falha na autenticação', `Erro na autenticação`);
    yield put(signFailure());
  }
}

export default all([takeLatest('@auth/SIGN_IN_REQUEST', singIn)]);
