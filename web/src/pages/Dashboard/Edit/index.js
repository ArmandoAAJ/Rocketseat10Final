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

export default function Edit({ location }) {
  // Pego os dados do state e seto as variaveis que vou usar
  const stateOrder = location.state ? location.state.order : [];
  const initialData = stateOrder; // Passar o initial data do form

  const [opRecipients, setOpRecipients] = useState();
  const [opDeliverymans, setOpDeliverymans] = useState();

  const [deliverymans, setDeliverymans] = useState();
  const [recipients, setRecipients] = useState();

  useEffect(() => {
    async function loadSelect() {
      const response = await api.get('deliverymans');
      const responseR = await api.get('recipients');

      try {
        const data = response.data.map(d => ({
          label: d.name,
          value: d.id,
        }));

        const dataR = responseR.data.map(r => ({
          label: r.name,
          value: r.id,
        }));

        setDeliverymans(data);
        setRecipients(dataR);
      } catch (error) {
        toast.warning(response.data.ERRO);
      }
    }
    loadSelect();
  }, []);

  async function handleSubmit({ product }) {
    const recipient_id = opRecipients.value;
    const deliveryman_id = opDeliverymans.value;

    const response = await api.post('orders', {
      recipient_id,
      deliveryman_id,
      product,
    });

    if (response) {
      history.push('/dashboard');
      toast.success('Edição bem sucedida!');
    }

    toast.error(response.data.ERRO);
  }

  return (
    <Container>
      <Header />
      <Form initialData={initialData} onSubmit={handleSubmit}>
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
                  name="optionsDeliveryman"
                  options={recipients}
                  onChange={e => setOpRecipients(e)}
                />
              </label>
              <label>
                Entregador
                <Select
                  name="optionsRecipient"
                  options={deliverymans}
                  onChange={e => setOpDeliverymans(e)}
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
