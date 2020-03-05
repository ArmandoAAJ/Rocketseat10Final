/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/button-has-type */

import React from 'react';
import { Link } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import { MdDone, MdChevronLeft } from 'react-icons/md';
import { toast } from 'react-toastify';
import { Container, Content, StudentsContent } from './styles';
import Header from '~/components/Header';
import api from '~/services/api';
import history from '~/services/history';

export default function New({ location, match }) {
  // Pego os dados do state e seto as variaveis que vou usar
  const stateOrder = location.state ? location.state.recipient : [];
  const initialData = stateOrder; // Passar o initial data do form
  const { id } = match.params;

  async function handleSubmit({
    name,
    rua,
    numero,
    complemento,
    cidade,
    estado,
    cep,
  }) {
    try {
      const response = await api.put(`recipients/${id}`, {
        name,
        rua,
        numero,
        complemento,
        cidade,
        estado,
        cep,
      });
      if (response) {
        toast.success('Registro salvo!');
        history.push('/destinatario');
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
            <h2>Edição de Destinatário</h2>
            <div>
              <Link to="/destinatario">
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
            <label> Nome</label>
            <Input name="name" required />
            <div>
              <label className="street">
                Rua
                <Input name="rua" required />
              </label>
              <label>
                Número
                <Input name="numero" required />
              </label>
              <label>
                Complemento
                <Input name="complemento" />
              </label>
            </div>
            <div>
              <label>
                Cidade
                <Input name="cidade" required />
              </label>
              <label>
                Estado
                <Input name="estado" required />
              </label>
              <label>
                Cep
                <Input name="cep" required />
              </label>
            </div>
          </StudentsContent>
        </Content>
      </Form>
    </Container>
  );
}
