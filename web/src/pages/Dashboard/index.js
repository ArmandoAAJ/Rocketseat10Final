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
} from 'react-icons/md';
import queryString from 'query-string';
import { format, isAfter } from 'date-fns';
import Avatar from 'react-avatar';
import history from '~/services/history';
import { Container, Content, ContentTable } from './styles';
import Header from '~/components/Header';
import api from '~/services/api';

export default function Dashboard({ location }) {
  const [orders, setOrders] = useState([]);
  const [visible, setVisible] = useState(false);
  const [recipient, setRecipient] = useState({});
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

  const { q } = queryString.parse(location.search);

  useEffect(() => {
    async function loadData() {
      const response = await api.get('orders', {
        params: { q },
      });

      const data = response.data.map(o => ({
        ...o,
        start: format(new Date(o.start_date), 'dd/MM/yyyy'),
        end: format(new Date(o.end_date), 'dd/MM/yyyy'),
        status: isAfter(new Date(), new Date(o.start_date)),
      }));

      console.tron.log(data);
      setOrders(data);
    }

    loadData();
  }, [q]);

  function handleSubmit(data) {
    history.push(`dashboard?q=${data.q}`);
  }

  function openModal(order) {
    setStartDate(order.start);
    setEndDate(order.end);
    setRecipient(order.recipient);
    setVisible(true);
  }

  function closeModal() {
    setVisible(false);
  }

  return (
    <Container>
      {/* Falta fazer a parte da img que está vindo fixa  */}
      <Modal
        visible={visible}
        width="400"
        height="350"
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
            {startDate === '31/12/1969' ? '' : startDate}
          </p>
          <p>
            Entrega:
            {endDate === '31/12/1969' ? '' : endDate}
          </p>
          <h4>Assinatura do destinatário</h4>
          <img
            alt="assinatura"
            src="https://upload.wikimedia.org/wikipedia/commons/d/dd/Monteiro_Lobato_ASSINATURA.jpg"
          />
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
                  <th>Produto</th>
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
                    <td>{order.product}</td>
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
                      ) : order.start_date && order.status ? (
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
                      <Link
                        to={{
                          pathname: `/orders/${order.id}`,
                          state: {
                            order,
                          },
                        }}
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
            <h3>Não há dados para a busca selecionada</h3>
          )}
        </ContentTable>
      </Content>
    </Container>
  );
}
