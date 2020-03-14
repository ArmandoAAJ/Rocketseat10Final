import React, { useState } from 'react';

import { Image } from 'react-native';

import { Container, Input, Button, Text } from './styles';
import Logo from '~/assets/img/logo.png';

export default function Dashboard() {
  const [userIds, setUserIds] = useState('');

  return (
    <Container>
      <Image source={Logo} tintColor="rgb(255, 255, 255)" />
      <Input
        placeholder="Informe seu ID de cadastro"
        keyboardType="numeric"
        returnKeyType="send"
        onChangeText={text => setUserIds({ setUserIds: text })}
      />
      <Button>
        <Text>Entrar no sistema</Text>
      </Button>
    </Container>
  );
}
