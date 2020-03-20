import React, { useState } from 'react';
import { Image, StatusBar } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { signInRequest } from '~/store/modules/auth/actions';

import { Container, Input, Button, Text } from './styles';
import Logo from '~/assets/img/logo.png';

export default function Sign() {
  const dispatch = useDispatch();
  const [id, setID] = useState('');

  const loading = useSelector(state => state.auth.loading);

  function handleSubmit() {
    dispatch(signInRequest(id));
  }

  return (
    <>
      <StatusBar backgroundColor="rgb(125, 64, 231)" barStyle="light-content" />
      <Container>
        <Image source={Logo} tintColor="rgb(255, 255, 255)" />
        <Input
          placeholder="Informe seu ID de cadastro"
          keyboardType="numeric"
          returnKeyType="send"
          onSubmitEditing={handleSubmit}
          onChangeText={setID}
        />
        <Button loading={loading} onPress={handleSubmit}>
          <Text>Entrar no sistema</Text>
        </Button>
      </Container>
    </>
  );
}
