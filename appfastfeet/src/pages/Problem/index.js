/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { StatusBar, Alert } from 'react-native';
import api from '~/services/api';

import { Container, Header, Box, Input, Button, Text } from './styles';

export default function Problem({ route, navigation }) {
  const { order } = route.params;
  const [problem, setProblem] = useState('');

  async function handleSubmit() {
    try {
      await api.post('orders/problems', {
        order_id: order.id,
        description: problem,
      });
      Alert.alert('Sucesso!', 'Dados inseridos com sucesso');
      navigation.navigate('Dashboard');
    } catch (error) {
      Alert.alert('Falha na autenticação', 'Verifique os dados');
    }
  }

  return (
    <>
      <StatusBar backgroundColor="rgb(125, 64, 231)" barStyle="light-content" />
      <Container>
        <Header>
          <Box>
            <Input
              placeholder="Inclua aqui o problema que ocorreu na entrega"
              keyboardType="default"
              multiline
              onChangeText={setProblem}
            />
          </Box>
          <Button onPress={handleSubmit}>
            <Text>Enviar</Text>
          </Button>
        </Header>
      </Container>
    </>
  );
}
