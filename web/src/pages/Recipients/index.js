/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/prop-types */
/* eslint-disable react/button-has-type */
/* eslint-disable react/jsx-no-undef */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import queryString from 'query-string';
import { Form, Input } from '@rocketseat/unform';
import { MdAdd, MdDelete, MdModeEdit } from 'react-icons/md';
import { confirmAlert } from 'react-confirm-alert';
import { toast } from 'react-toastify';
import api from '~/services/api';
import history from '~/services/history';
import { Container, Content, ContentTable } from './styles';
import Header from '~/components/Header';

export default function Recipients({ location }) {
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
    history.push(`destinatario?q=${data.q}`);
  }

  async function handleRecipientDelete(id) {
    try {
      await api.delete(`recipients/${id}`);
      toast.success('Destinatário deletado com sucesso');
      history.push(`destinatario?q=`);
    } catch (err) {
      toast.error('Destinatário não encontrado!');
    }
  }

  function confirmRecipientDelete(id) {
    confirmAlert({
      title: 'Deletar Destinatário',
      message: 'Você está certo disso? Não poderá desfazer está ação!',
      buttons: [
        {
          label: 'Sim',
          onClick: () => handleRecipientDelete(id),
        },
        {
          label: 'Não',
          onClick: () => {},
        },
      ],
    });
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
                    <td>
                      {recipient.id < 10
                        ? `# 0${recipient.id}`
                        : `# ${recipient.id}`}
                    </td>
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
                      <Link
                        onClick={() => confirmRecipientDelete(recipient.id)}
                      >
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
