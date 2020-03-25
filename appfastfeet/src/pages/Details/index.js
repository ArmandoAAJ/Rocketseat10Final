/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable no-nested-ternary */
import React, { useMemo } from 'react';
import { StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { format, parseISO, isAfter } from 'date-fns';
import { pt } from 'date-fns/locale';

import {
  Container,
  Header,
  Box,
  TextInfo,
  BoxInfo,
  TextTitle,
  TextDesc,
  BoxSituation,
  BoxInfoSituation,
  TextTitleDataR,
  TextTitleDataE,
  BoxData,
  BoxDataE,
  BoxButtom,
  Problem,
  ViewProblem,
  Confirm,
  TextProblem,
} from './styles';

export default function Details({ route, navigation }) {
  const { order } = route.params;

  const status = useMemo(() =>
    isAfter(new Date(), new Date(order.start_date), { locale: pt })
  );

  const end_date = useMemo(() =>
    order.end_date
      ? format(parseISO(order.end_date), 'dd/MM/yyyy', {
          locale: pt,
        })
      : '--/--/--'
  );

  const start_date = useMemo(() =>
    order.start_date
      ? format(parseISO(order.start_date), 'dd/MM/yyyy', {
          locale: pt,
        })
      : '--/--/--'
  );

  return (
    <>
      <StatusBar backgroundColor="rgb(125, 64, 231)" barStyle="light-content" />
      <Container>
        <Header>
          <Box>
            <BoxInfo>
              <Icon name="local-shipping" size={20} color="rgb(125, 64, 231)" />
              <TextInfo>Informações da entrega</TextInfo>
            </BoxInfo>
            <TextTitle>DESTINATÁRIO</TextTitle>
            <TextDesc>{order.recipient.name}</TextDesc>
            <TextTitle>ENDEREÇO DA ENTREGA</TextTitle>
            <TextDesc>
              {order.recipient.rua}, {order.recipient.numero},
              {order.recipient.cidade}-{order.recipient.estado},
              {order.recipient.cep}
            </TextDesc>
            <TextTitle>PRODUTO</TextTitle>
            <TextDesc>{order.product}</TextDesc>
          </Box>
          <BoxSituation>
            <BoxInfo>
              <Icon name="event" size={20} color="rgb(125, 64, 231)" />
              <TextInfo>Situação da entrega</TextInfo>
            </BoxInfo>
            <TextTitle>STATUS</TextTitle>
            <TextDesc>
              {order.canceled_at ? (
                <TextDesc>Cancelada</TextDesc>
              ) : order.end_date ? (
                <TextDesc>Entregue</TextDesc>
              ) : order.start_date && status ? (
                <TextDesc>Retirada</TextDesc>
              ) : (
                <TextDesc>Pendente</TextDesc>
              )}
            </TextDesc>
            <BoxInfoSituation>
              <BoxData>
                <TextTitleDataR>DATA DA RETIRADA</TextTitleDataR>
                <TextDesc>{start_date}</TextDesc>
              </BoxData>
              <BoxDataE>
                <TextTitleDataE>DATA DA ENTREGA</TextTitleDataE>
                <TextDesc>{end_date}</TextDesc>
              </BoxDataE>
            </BoxInfoSituation>
          </BoxSituation>
          <BoxButtom>
            <Problem onPress={() => navigation.navigate('Problem', { order })}>
              <Icon name="cancel" size={25} color="rgb(231, 64, 64)" />
              <TextProblem>Informar Problema</TextProblem>
            </Problem>
            <ViewProblem
              onPress={() => navigation.navigate('ViewProblem', { order })}
            >
              <Icon name="error-outline" size={25} color="rgb(233, 194, 87)" />
              <TextProblem>Visualizar Problemas</TextProblem>
            </ViewProblem>
            <Confirm
              onPress={() => navigation.navigate('Signature', { order })}
            >
              <Icon name="check-circle" size={25} color="rgb(125, 64, 231)" />
              <TextProblem>Confirmar Entregas</TextProblem>
            </Confirm>
          </BoxButtom>
        </Header>
      </Container>
    </>
  );
}
