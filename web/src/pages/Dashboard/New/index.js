/* eslint-disable no-empty */
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

export default function New() {
  const [deliverymans, setDeliverymans] = useState();
  const [recipients, setRecipients] = useState();
  const [opRecipients, setOpRecipients] = useState();
  const [opDeliverymans, setOpDeliverymans] = useState();

  useEffect(() => {
    async function loadSelect() {
      const responseDeliveryman = await api.get('deliverymans');
      const responseRecipients = await api.get('recipients');

      try {
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
      } catch (err) {
        toast.warning(responseRecipients.data.ERRO);
        toast.warning(responseDeliveryman.data.ERRO);
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
      history.push('dashboard');
      toast.success('Entrega criada com sucesso!');
    }

    toast.error(response.data.ERRO);
  }

  return (
    <Container>
      <Header />
      <Form onSubmit={handleSubmit}>
        <Content>
          <nav>
            <h2>Cadastro de Encomendas</h2>
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
                  name=""
                  onChange={e => setOpRecipients(e)}
                  options={recipients}
                  placeholder="Selecione o Destinatário"
                />
              </label>
              <label>
                Entregador
                <Select
                  name=""
                  onChange={e => setOpDeliverymans(e)}
                  options={deliverymans}
                  placeholder="Selecione o Entregador"
                />
              </label>
            </div>
            <label> Nome do Produto</label>
            <Input
              name="product"
              placeholder="Digite o nome do produto"
              required
            />
          </StudentsContent>
        </Content>
      </Form>
    </Container>
  );
}
