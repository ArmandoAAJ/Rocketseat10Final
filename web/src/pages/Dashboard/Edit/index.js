/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/button-has-type */

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Select from 'react-select';
import { Form, Input } from '@rocketseat/unform';
import { MdDone, MdChevronLeft } from 'react-icons/md';
import { toast } from 'react-toastify';
import { Container, Content, StudentsContent } from './styles';
import Header from '~/components/Header';
import api from '~/services/api';
import history from '~/services/history';

export default function New({ location, match }) {
  // Pego os dados do state e seto as variaveis que vou usar
  const stateOrder = location.state ? location.state.order : [];
  const initialData = stateOrder; // Passar o initial data do form
  const { id } = match.params;
  const [deliverymans, setDeliverymans] = useState();
  const [recipients, setRecipients] = useState();
  const [opRecipients, setOpRecipients] = useState({
    value: initialData.recipient_id,
  });
  const [opDeliverymans, setOpDeliverymans] = useState({
    value: initialData.deliveryman_id,
  });

  useEffect(() => {
    async function loadSelect() {
      const responseDeliveryman = await api.get('deliverymans');
      const responseRecipients = await api.get('recipients');

      const dataDeliveryman = responseDeliveryman.data.map(d => ({
        value: d.id,
        label: d.name,
      }));

      const dataRecipient = responseRecipients.data.map(r => ({
        value: r.id,
        label: r.name,
      }));

      setRecipients(dataRecipient);
      setDeliverymans(dataDeliveryman);
    }
    loadSelect();
  }, []);

  async function handleSubmit({ product }) {
    const recipient_id = opRecipients.value;
    const deliveryman_id = opDeliverymans.value;
    try {
      const response = await api.put(`orders/${id}`, {
        recipient_id,
        deliveryman_id,
        product,
      });
      if (response) {
        toast.success('Registro salvo!');
        history.push('/dashboard');
      }
    } catch (err) {
      toast.error(err.response.data.ERRO);
    }
  }

  return (
    <Container>
      <Header />
      <Form onSubmit={handleSubmit} initialData={initialData}>
        <Content>
          <nav>
            <h2>Edição de Encomendas</h2>
            <div>
              <Link to="/dashboard">
                <button>
                  <MdChevronLeft size={19} />
                  &nbsp;Voltar
                </button>
              </Link>
              <button type="submit" className="last">
                <MdDone size={19} />
                &nbsp;Salvar
              </button>
            </div>
          </nav>
          <StudentsContent>
            <div className="select">
              <label>
                Destinatário
                <Select
                  onChange={e => setOpRecipients(e)}
                  options={recipients}
                  placeholder={initialData.recipient.name}
                />
              </label>
              <label>
                Entregador
                <Select
                  onChange={e => setOpDeliverymans(e)}
                  options={deliverymans}
                  placeholder={initialData.deliveryman.name}
                />
              </label>
            </div>
            <label> Nome do Produto</label>
            <Input name="product" required />
          </StudentsContent>
        </Content>
      </Form>
    </Container>
  );
}
