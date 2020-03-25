/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { StatusBar, ActivityIndicator } from 'react-native';
import { format, parseISO } from 'date-fns';
import { pt } from 'date-fns/locale';
import api from '~/services/api';
import {
  Container,
  Header,
  Box,
  BoxProblem,
  TextDescription,
  TextDate,
} from './styles';

export default function ViewProblem({ route }) {
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(false);
  const { order } = route.params;

  useEffect(() => {
    async function loadProblem() {
      try {
        const response = await api.get(`/problems/${order.id}`);
        const data = response.data.map(p => ({
          ...p,
          dateFormatted: format(parseISO(p.createdAt), 'dd/MM/yyyy', {
            locale: pt,
          }),
        }));
        setLoading(false);
        setProblems(data);
      } catch (error) {
        setLoading(true);
      }
    }

    loadProblem();
  }, [order]);

  console.tron.log(loading);
  return (
    <>
      <StatusBar backgroundColor="rgb(125, 64, 231)" barStyle="light-content" />
      <Container>
        <Header>
          <Box>
            {loading ? (
              <ActivityIndicator
                size="large"
                color="rgb(125, 64, 231)"
                style={{ paddingTop: 100 }}
              />
            ) : (
              problems.map(problem => (
                <BoxProblem key={problem.id}>
                  <TextDescription>{problem.description}</TextDescription>
                  <TextDate>{problem.dateFormatted}</TextDate>
                </BoxProblem>
              ))
            )}
          </Box>
        </Header>
      </Container>
    </>
  );
}
