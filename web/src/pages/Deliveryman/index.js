/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/button-has-type */
/* eslint-disable react/jsx-no-undef */
import React, { useEffect, useState } from 'react';

import { MdAdd, MdDelete, MdModeEdit } from 'react-icons/md';
import Avatar from 'react-avatar';
import { Link } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import queryString from 'query-string';
import api from '~/services/api';
import { Container, Content, ContentTable } from './styles';
import Header from '~/components/Header';

export default function Dashboard({ location }) {
  const [deliverymans, setDeliverymans] = useState([]);

  const { q } = queryString.parse(location.search);

  useEffect(() => {
    async function loadData() {
      const response = await api.get('deliverymans', {
        params: { q },
      });

      try {
        const data = response.data.map(r => ({
          ...r,
          url: r.avatar_id ? r.avatar.url : null,
        }));

        setDeliverymans(data);
      } catch (error) {
        setDeliverymans(response.data);
      }
    }
    loadData();
  }, [q]);

  return (
    <Container>
      <Header />
      <Content>
        <nav>
          <h2>Gerenciando Encomendas</h2>
        </nav>
        <div>
          <Form onSubmit="">
            <Input name="" placeholder="Buscar Encomendas" />
          </Form>
          <Link to="/novoentregador">
            <button className="cadastrar">
              <MdAdd size={19} />
              &nbsp;Cadastrar
            </button>
          </Link>
        </div>
        <ContentTable>
          {/* {orders.length > 0 ? ( */}
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Foto</th>
                <th>Nome</th>
                <th>Email</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {deliverymans.map(deliveryman => (
                <tr key={deliveryman.id}>
                  <td>#{deliveryman.id}</td>
                  <td>
                    <Avatar
                      round
                      src={
                        deliveryman.url
                          ? deliveryman.url
                          : 'https://api.adorable.io/avatars/116/abott@adorable.png '
                      }
                      size={25}
                      textSizeRatio={2}
                    />
                  </td>
                  <td>{deliveryman.name}</td>
                  <td>{deliveryman.email}</td>
                  <td>
                    {/* Não consegui fazer o clic então criei 3 botões separados  */}
                    <Link
                      to={{
                        pathname: `/editarentregador/${deliveryman.id}`,
                        state: {
                          deliveryman,
                        },
                      }}
                    >
                      <button className="icons">
                        <MdModeEdit color="#1E90FF" />
                      </button>
                    </Link>
                    <Link>
                      <button className="icons">
                        <MdDelete color="#B22222" />
                      </button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* ) : (
            <h3>não há nada por aqui :/</h3>
          )} */}
        </ContentTable>
      </Content>
    </Container>
  );
}
