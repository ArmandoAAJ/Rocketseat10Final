import React, { useState } from 'react';

import { Image, Alert } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import api from '~/services/api';

import { Container, Input, Button, Text } from './styles';
import Logo from '~/assets/img/logo.png';

export default function Sign() {
  const [userIds, setUserIds] = useState('');

  async function loadDeliveryman() {
    try {
      await api.get(`deliverymans/${userIds}`);
      AsyncStorage.setItem('logado', JSON.stringify(true));
    } catch (error) {
      AsyncStorage.setItem('logado', JSON.stringify(false));
      Alert.alert('Falha no acesso', 'Verifique seu ID e tente novamente');
    }
  }

  return (
    <Container>
      <Image source={Logo} tintColor="rgb(255, 255, 255)" />
      <Input
        placeholder="Informe seu ID de cadastro"
        keyboardType="numeric"
        returnKeyType="send"
        onSubmitEditing={loadDeliveryman}
        onChangeText={setUserIds}
      />
      <Button onPress={loadDeliveryman}>
        <Text>Entrar no sistema</Text>
      </Button>
    </Container>
  );
}
