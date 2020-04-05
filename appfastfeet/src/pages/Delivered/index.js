/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { ActivityIndicator, ScrollView, StatusBar } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { format, parseISO } from 'date-fns';
import { pt } from 'date-fns/locale';
import { useSelector, useDispatch } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Avatar } from 'react-native-elements';
import {
  Container,
  Header,
  Nav,
  TextSmall,
  TextName,
  IconLogout,
  TextEntregas,
  Content,
  TextLinkE,
  TextLinkP,
  NavLink,
  Box,
  TextNumberEncomenda,
  BoxHeader,
  BoxPogress,
  ProgressBar,
  DotHolder,
  Dot,
  Line,
  BoxFooter,
  Date,
  TextDate,
  TextDateNumber,
  City,
  TextCity,
  TextCityName,
  Details,
  TextDetails,
  LinkDetails,
} from './styles';

import api from '~/services/api';
import { signOut } from '~/store/modules/auth/actions';

export default function Dashboard({ navigation }) {
  const isFocused = useIsFocused();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const profile = useSelector(state => state.user.profile);

  useEffect(() => {
    async function loadOrder() {
      try {
        const response = await api.get(`orders/${profile.id}/delivered`);

        setOrders(response.data);
        setLoading(false);
      } catch (error) {
        setLoading(true);
      }
    }
    if (isFocused) {
      loadOrder();
    }
  }, [isFocused]);

  function handleLogout() {
    dispatch(signOut());
  }

  return (
    <>
      <StatusBar backgroundColor="rgb(255, 255, 255)" barStyle="dark-content" />
      <Container>
        <Header>
          {profile.avatar.url ? (
            <Avatar
              size="medium"
              rounded
              source={{
                uri: `${profile.avatar.url}`,
              }}
            />
          ) : (
            <Avatar rounded title="MD" size="medium" />
          )}
          <Nav>
            <TextSmall>Bem vindo de volta,</TextSmall>
            <TextName>{profile.name}</TextName>
          </Nav>
          <IconLogout>
            <Icon
              name="input"
              size={20}
              color="#E74040"
              onPress={handleLogout}
            />
          </IconLogout>
        </Header>
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        >
          <Content>
            <TextEntregas>Entregas</TextEntregas>
            <NavLink>
              <TextLinkP onPress={() => navigation.navigate('Dashboard')}>
                Pendentes
              </TextLinkP>
              <TextLinkE>Entregues-{orders.length}</TextLinkE>
            </NavLink>
          </Content>
          {loading ? (
            <ActivityIndicator
              size="large"
              color="rgb(125, 64, 231)"
              style={{ paddingTop: 100 }}
            />
          ) : (
            orders.map(order => (
              <Box key={order.id}>
                <BoxHeader key={order.id}>
                  <Icon
                    name="local-shipping"
                    size={20}
                    color="rgb(125, 64, 231)"
                  />
                  <TextNumberEncomenda>
                    Encomenda {order.id < 10 ? `0${order.id}` : order.id}
                  </TextNumberEncomenda>
                </BoxHeader>
                <BoxPogress>
                  <ProgressBar>
                    <DotHolder>
                      <Dot done />
                      <Line />
                      <Dot done={order.createdAt} />
                      <Line />
                      <Dot done={!!order.end_date} />
                    </DotHolder>
                  </ProgressBar>
                </BoxPogress>

                <BoxFooter>
                  <Date>
                    <TextDate>Data</TextDate>
                    <TextDateNumber>
                      {order.createdAt
                        ? format(parseISO(order.createdAt), 'dd/MM/yyyy', {
                            locale: pt,
                          })
                        : '--/--/--'}
                    </TextDateNumber>
                  </Date>
                  <City>
                    <TextCity>Cidade</TextCity>
                    <TextCityName>{order.recipient.cidade}</TextCityName>
                  </City>
                  <Details>
                    <TextCity />
                    <LinkDetails
                      onPress={() => navigation.navigate('Details', { order })}
                    >
                      <TextDetails>ver detalhes</TextDetails>
                    </LinkDetails>
                  </Details>
                </BoxFooter>
              </Box>
            ))
          )}
        </ScrollView>
      </Container>
    </>
  );
}
