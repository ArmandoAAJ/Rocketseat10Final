/* eslint-disable no-unused-expressions */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/prop-types */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/button-has-type */
import React, { useEffect, useState } from 'react';
import { Form, Input } from '@rocketseat/unform';
import { Link } from 'react-router-dom';
import Modal from 'react-awesome-modal';

import {
  MdAdd,
  MdFiberManualRecord,
  MdDelete,
  MdModeEdit,
  MdRemoveRedEye,
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
} from 'react-icons/md';
import queryString from 'query-string';
import { format, parseISO } from 'date-fns';
import { pt } from 'date-fns/locale';
import Avatar from 'react-avatar';
import { toast } from 'react-toastify';
import { confirmAlert } from 'react-confirm-alert';
import history from '~/services/history';
import { Container, Content, ContentTable, Pagination } from './styles';
import Header from '~/components/Header';
import api from '~/services/api';

export default function Dashboard({ location }) {
  const [page, setPage] = useState(1);
  const [totalRows, setTotalRows] = useState(0);
  const [orders, setOrders] = useState([]);
  const [visible, setVisible] = useState(false);
  const [recipient, setRecipient] = useState([]);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [signature, setSignature] = useState([]);
  const { q } = queryString.parse(location.search);

  useEffect(() => {
    async function loadData() {
      const response = await api.get('orders', {
        params: { q, page },
      });
      const total = response.data.count / 5;

      if (total % 1 === 0) {
        setTotalRows(total);
      } else {
        const x = Math.trunc(total);
        setTotalRows(x + 1);
      }

      try {
        const data = response.data.rows.map(o => ({
          ...o,
          optionsDelivery: {
            value: o.deliveryman.id,
            label: o.deliveryman.name,
          },
          optionsRecipient: {
            value: o.recipient.id,
            label: o.recipient.name,
          },
        }));

        setOrders(data);
      } catch (err) {
        setOrders(response.data.rows);
        const totals = Math.round(response.data.count / 5);
        if (totals % 1 === 0) {
          setTotalRows(totals);
        } else {
          const x = Math.trunc(totals);
          setTotalRows(x + 1);
        }
      }
    }

    loadData();
  }, [q, page]);

  function handleSubmit(data) {
    history.push(`dashboard?q=${data.q}`);
  }

  function openModal(order) {
    const end = order.end_date
      ? format(parseISO(order.end_date), 'dd/MM/yyyy', {
          locale: pt,
        })
      : '--/--/--';

    const start = order.createdAt
      ? format(parseISO(order.createdAt), 'dd/MM/yyyy', {
          locale: pt,
        })
      : '--/--/--';

    setStartDate(start);
    setEndDate(end);
    setRecipient(order.recipient);
    setVisible(true);
    setSignature(order.signature);
  }

  function closeModal() {
    setVisible(false);
  }

  async function handleOrderDelete(id) {
    try {
      await api.delete(`orders/${id}`);
      toast.success('Encomenda deletada com sucesso');
      history.push(`dashboard?q=`);
    } catch (err) {
      toast.error(err.response.data.ERRO);
    }
  }

  function confirmOrderDelete(id) {
    confirmAlert({
      title: 'Deletar Encomenda',
      message: 'Você está certo disso? Não poderá desfazer está ação!',
      buttons: [
        {
          label: 'Sim',
          onClick: () => handleOrderDelete(id),
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
      <Modal
        visible={visible}
        width="400"
        min-height="350"
        max-height="auto"
        effect="fadeInDown"
        onClickAway={() => closeModal()}
      >
        <div className="modal">
          <h4>Informações da encomenda</h4>
          <p>{recipient.rua}</p>
          <p>
            {recipient.cidade} - {recipient.estado}
          </p>
          <p>{recipient.cep}</p>
          <h4>Datas</h4>
          <p>
            Retirada:
            {startDate}
          </p>
          <p>
            Entrega:
            {endDate}
          </p>
          <h4>Assinatura do destinatário</h4>
          {signature ? (
            <img src={signature.url} alt="assinatura" height="350" />
          ) : (
            <img src="" alt="" />
          )}
        </div>
      </Modal>

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
            <button className="cadastrar">
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
                    <td>
                      {order.id < 10 ? `# 0${order.id}` : `# ${order.id}`}
                    </td>
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
                      ) : (
                        <li className="retirado">
                          <MdFiberManualRecord />
                          RETIRADO
                        </li>
                      )}
                    </td>
                    <td>
                      {/* Não consegui fazer o clic então criei 3 botões separados  */}
                      <button
                        className="icons"
                        onClick={() => openModal(order)}
                      >
                        <MdRemoveRedEye color="#6A5ACD" />
                      </button>
                      <Link
                        to={{
                          pathname: `/editarencomenda/${order.id}`,
                          state: {
                            order,
                          },
                        }}
                      >
                        <button className="icons">
                          <MdModeEdit color="#1E90FF" />
                        </button>
                      </Link>

                      <Link onClick={() => confirmOrderDelete(order.id)}>
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
        {orders.length > 0 ? (
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
