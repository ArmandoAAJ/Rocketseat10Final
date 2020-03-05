/* eslint-disable react/prop-types */
/* eslint-disable react/button-has-type */
/* eslint-disable react/jsx-no-undef */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import queryString from 'query-string';
import { Form, Input } from '@rocketseat/unform';
import { MdAdd, MdDelete, MdModeEdit } from 'react-icons/md';
import api from '~/services/api';
import history from '~/services/history';
import { Container, Content, ContentTable } from './styles';
import Header from '~/components/Header';

export default function Dashboard({ location }) {
  const [recipients, setRecipients] = useState([]);
  const { q } = queryString.parse(location.search);

  useEffect(() => {
    async function loadRecipient() {
      const response = await api.get('recipients', {
        params: { q },
      });

      setRecipients(response.data);
    }
    loadRecipient();
  }, [q]);

  function handleSubmit(data) {
    history.push(`destinattario?q=${data.q}`);
  }

  return (
    <Container>
      <Header />
      <Content>
        <nav>
          <h2>Gerenciando Destinatário</h2>
        </nav>
        <div>
          <Form onSubmit={handleSubmit}>
            <Input name="q" placeholder="Buscar Destinatário" />
          </Form>
          <Link to="/novodestinatario">
            <button className="cadastrar">
              <MdAdd size={19} />
              &nbsp;Cadastrar
            </button>
          </Link>
        </div>
        <ContentTable>
          {recipients.length > 0 ? (
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nome</th>
                  <th>Endereço</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {recipients.map(recipient => (
                  <tr>
                    <td>#{recipient.id}</td>
                    <td>{recipient.name}</td>
                    <td>
                      {recipient.rua}, {recipient.numero}, {recipient.cidade}-
                      {recipient.estado}
                    </td>

                    <td>
                      {/* Não consegui fazer o clic então criei 3 botões separados  */}
                      <Link
                        to={{
                          pathname: `/editardestinatario/${recipient.id}`,
                          state: {
                            recipient,
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
          ) : (
            <h3>não há nada por aqui :/</h3>
          )}
        </ContentTable>
      </Content>
    </Container>
  );
}
