/* eslint-disable no-nested-ternary */
/* eslint-disable react/button-has-type */
import React, { useEffect, useState } from 'react';
import { Form, Input } from '@rocketseat/unform';
import { Link, useLocation } from 'react-router-dom';

import { MdAdd, MdFiberManualRecord } from 'react-icons/md';
import queryString from 'query-string';
import Avatar from 'react-avatar';
import history from '~/services/history';
import { Container, Content, ContentTable } from './styles';
import Header from '~/components/Header';

import api from '~/services/api';

export default function Dashboard() {
  const [orders, setOrders] = useState([]);
  const urlString = useLocation();

  const { q } = queryString.parse(urlString.search);

  useEffect(() => {
    async function loadData() {
      const response = await api.get('orders', {
        params: { q },
      });

      setOrders(response.data);
    }

    loadData();
  }, [q]);

  function handleSubmit(data) {
    history.push(`dashboard?q=${data.q}`);
  }

  return (
    <Container>
      <Header />
      <Content>
        <nav>
          <h2>Gerenciando Encomendas</h2>
        </nav>
        <div>
          <Form onSubmit={handleSubmit}>
            <Input name="q" placeholder="Buscar Encomendas" />
          </Form>
          <Link to="/novaencomenda">
            <button>
              <MdAdd size={19} />
              &nbsp;Cadastrar
            </button>
          </Link>
        </div>
        <ContentTable>
          {orders.length > 0 ? (
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Destinatário</th>
                  <th>Entregador</th>
                  <th>Cidade</th>
                  <th>Estado</th>
                  <th>Status</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {orders.map(order => (
                  <tr key={order.id}>
                    <td>#{order.id}</td>
                    <td>{order.recipient.name}</td>
                    <td>
                      <Avatar
                        round
                        name={order.deliveryman.name}
                        size={25}
                        textSizeRatio={2}
                      />
                      &nbsp;&nbsp;
                      {order.deliveryman.name}
                    </td>
                    <td>{order.recipient.cidade}</td>
                    <td>{order.recipient.estado}</td>
                    <td>
                      {order.canceled_at ? (
                        <li className="cancelado">
                          <MdFiberManualRecord />
                          CANCELADA
                        </li>
                      ) : order.end_date ? (
                        <li className="entregue">
                          <MdFiberManualRecord />
                          ENTREGUE
                        </li>
                      ) : order.start_date ? (
                        <li className="retirado">
                          <MdFiberManualRecord />
                          RETIRADA
                        </li>
                      ) : (
                        <li className="pendente">
                          <MdFiberManualRecord />
                          PENDENTE
                        </li>
                      )}
                    </td>
                    <td>...</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <h3>Não há dados para a busca selecionada</h3>
          )}
        </ContentTable>
      </Content>
    </Container>
  );
}
