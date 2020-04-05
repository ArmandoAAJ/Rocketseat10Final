/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/button-has-type */
/* eslint-disable react/jsx-no-undef */
import React, { useEffect, useState } from 'react';

import {
  MdAdd,
  MdDelete,
  MdModeEdit,
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
} from 'react-icons/md';
import Avatar from 'react-avatar';
import { Link } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import queryString from 'query-string';
import { confirmAlert } from 'react-confirm-alert';
import { toast } from 'react-toastify';
import api from '~/services/api';
import history from '~/services/history';
import { Container, Content, ContentTable, Pagination } from './styles';
import Header from '~/components/Header';

export default function New({ location }) {
  const [page, setPage] = useState(1);
  const [totalRows, setTotalRows] = useState(0);
  const [deliverymans, setDeliverymans] = useState([]);

  const { q } = queryString.parse(location.search);

  useEffect(() => {
    async function loadData() {
      const response = await api.get('deliverymans', {
        params: { q, page },
      });

      try {
        const data = response.data.rows.map(r => ({
          ...r,
          url: r.avatar_id ? r.avatar.url : null,
        }));

        const total = response.data.count / 5;

        if (total % 1 === 0) {
          setTotalRows(total);
        } else {
          const x = Math.trunc(total);
          setTotalRows(x + 1);
        }

        setDeliverymans(data);
      } catch (error) {
        const totals = Math.round(response.data.count / 5);
        if (totals % 1 === 0) {
          setTotalRows(totals);
        } else {
          const x = Math.trunc(totals);
          setTotalRows(x + 1);
        }
        setDeliverymans(response.data);
      }
    }
    loadData();
  }, [q, page]);

  function handleSubmit(data) {
    history.push(`entregador?q=${data.q}`);
  }

  async function handleDeliverymanDelete(id) {
    try {
      await api.delete(`deliverymans/${id}`);
      toast.success('Entregador deletado com sucesso');
      history.push(`entregador?q=`);
    } catch (err) {
      toast.error('Entregador não encontrado!');
    }
  }

  function confirmDeliverymanDelete(id) {
    confirmAlert({
      title: 'Deletar Entregador',
      message: 'Você está certo disso? Não poderá desfazer está ação!',
      buttons: [
        {
          label: 'Sim',
          onClick: () => handleDeliverymanDelete(id),
        },
        {
          label: 'Não',
          onClick: () => {},
        },
      ],
    });
  }

  function handlePage(action) {
    setPage(action === 'back' ? page - 1 : page + 1);
  }

  return (
    <Container>
      <Header />
      <Content>
        <nav>
          <h2>Gerenciando Entregadores</h2>
        </nav>
        <div>
          <Form onSubmit={handleSubmit}>
            <Input name="q" placeholder="Buscar Entregadores" />
          </Form>
          <Link to="/novoentregador">
            <button className="cadastrar">
              <MdAdd size={19} />
              &nbsp;Cadastrar
            </button>
          </Link>
        </div>
        <ContentTable>
          {deliverymans.length > 0 ? (
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
                    <td>
                      {deliveryman.id < 10
                        ? `# 0${deliveryman.id}`
                        : `# ${deliveryman.id}`}
                    </td>
                    <td>
                      <Avatar
                        round
                        src={
                          deliveryman.url
                            ? deliveryman.url
                            : 'https://api.adorable.io/avatars/50/abott@adorable.png'
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
                      <Link
                        onClick={() => confirmDeliverymanDelete(deliveryman.id)}
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
        {deliverymans.length > 0 ? (
          <Pagination>
            <button
              type="button"
              disabled={page < 2}
              onClick={() => handlePage('back')}
            >
              <MdKeyboardArrowLeft size={30} />
            </button>
            <span>Página {page}</span>
            <button
              type="button"
              onClick={() => handlePage('next')}
              disabled={page === totalRows}
            >
              <MdKeyboardArrowRight size={30} />
            </button>
          </Pagination>
        ) : (
          ''
        )}
      </Content>
    </Container>
  );
}
