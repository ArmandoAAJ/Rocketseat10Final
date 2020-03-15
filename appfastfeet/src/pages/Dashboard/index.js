/* eslint-disable react/prop-types */
import React from 'react';
import { ScrollView } from 'react-native';
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
  BoxFooter,
  Date,
  TextDate,
  TextDateNumber,
  City,
  TextCity,
  TextCityName,
  Details,
  TextLinkDetails,
} from './styles';

export default function Dashboard() {
  return (
    <Container>
      <Header>
        <Avatar rounded title="MD" size="medium" />
        <Nav>
          <TextSmall>Bem vindo de volta,</TextSmall>
          <TextName>Armando Joergensen</TextName>
        </Nav>
        <IconLogout>
          <Icon name="input" size={20} color="#E74040" />
        </IconLogout>
      </Header>
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        <Content>
          <TextEntregas>Entregas</TextEntregas>
          <NavLink>
            <TextLinkP>Pendentes</TextLinkP>
            <TextLinkE>Entregues</TextLinkE>
          </NavLink>
        </Content>
        <Box>
          <BoxHeader>
            <Icon name="local-shipping" size={20} color="rgb(125, 64, 231)" />
            <TextNumberEncomenda>Encomenda 01</TextNumberEncomenda>
          </BoxHeader>

          <BoxFooter>
            <Date>
              <TextDate>Data</TextDate>
              <TextDateNumber>11/11/11</TextDateNumber>
            </Date>
            <City>
              <TextCity>Cidade</TextCity>
              <TextCityName>São José do Cedro</TextCityName>
            </City>
            <Details>
              <TextLinkDetails />
              <TextLinkDetails>Ver Detalhes</TextLinkDetails>
            </Details>
          </BoxFooter>
        </Box>

        <Box>
          <BoxHeader>
            <Icon name="local-shipping" size={20} color="rgb(125, 64, 231)" />
            <TextNumberEncomenda>Encomenda 02</TextNumberEncomenda>
          </BoxHeader>

          <BoxFooter>
            <Date>
              <TextDate>Data</TextDate>
              <TextDateNumber>12/12/12</TextDateNumber>
            </Date>
            <City>
              <TextCity>Cidade</TextCity>
              <TextCityName>São Paulo</TextCityName>
            </City>
            <Details>
              <TextLinkDetails />
              <TextLinkDetails>Ver Detalhes</TextLinkDetails>
            </Details>
          </BoxFooter>
        </Box>

        <Box>
          <BoxHeader>
            <Icon name="local-shipping" size={20} color="rgb(125, 64, 231)" />
            <TextNumberEncomenda>Encomenda 02</TextNumberEncomenda>
          </BoxHeader>

          <BoxFooter>
            <Date>
              <TextDate>Data</TextDate>
              <TextDateNumber>12/12/12</TextDateNumber>
            </Date>
            <City>
              <TextCity>Cidade</TextCity>
              <TextCityName>São Paulo</TextCityName>
            </City>
            <Details>
              <TextLinkDetails />
              <TextLinkDetails>Ver Detalhes</TextLinkDetails>
            </Details>
          </BoxFooter>
        </Box>
      </ScrollView>
    </Container>
  );
}

Dashboard.navigationOptions = {
  tabBarLabel: 'Entregas',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="reorder" size={20} color={tintColor} />
  ),
};
