import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Avatar } from 'react-native-elements';
import { format, parseISO } from 'date-fns';
import { pt } from 'date-fns/locale';
import { signOut } from '~/store/modules/auth/actions';

import {
  Container,
  BoxImage,
  BoxDetails,
  TextTitle,
  TextDados,
  Button,
  Text,
} from './styles';

export default function Profile() {
  const profile = useSelector(state => state.user.profile);
  const dispatch = useDispatch();
  function handleLogout() {
    dispatch(signOut());
  }

  return (
    <Container>
      <BoxImage>
        <Avatar
          size={160}
          rounded
          source={{
            uri: `${profile.avatar.url}`,
          }}
        />
      </BoxImage>
      <BoxDetails>
        <TextTitle>Nome completo</TextTitle>
        <TextDados>{profile.name}</TextDados>
        <TextTitle>Email</TextTitle>
        <TextDados>{profile.email}</TextDados>
        <TextTitle>Data de cadastro</TextTitle>
        <TextDados>
          {format(parseISO(profile.date_register), 'dd/MM/yyyy', {
            locale: pt,
          })}
        </TextDados>
      </BoxDetails>
      <Button onPress={handleLogout}>
        <Text>Logout</Text>
      </Button>
    </Container>
  );
}
