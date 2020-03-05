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

import AvatarInput from '../AvatarInput';

export default function Edit({ location, match }) {
  const stateOrder = location.state ? location.state.deliveryman : [];
  const initialData = stateOrder; // Passar o initial data do form
  const { id } = match.params;

  async function handleSubmit({ avatar_id, email, name }) {
    try {
      const response = await api.put(`deliverymans/${id}`, {
        name,
        email,
        avatar_id,
      });
      if (response) {
        toast.success('Registro salvo!');
        history.push('/entregador');
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
            <h2>Edição de Entregadores</h2>
            <div>
              <Link to="/entregador">
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
            <AvatarInput name="avatar" required />
            <label> Nome</label>
            <Input name="name" placeholder="Digite o nome " required />
            <label> Email</label>
            <Input name="email" placeholder="Digite o email" required />
          </StudentsContent>
        </Content>
      </Form>
    </Container>
  );
}
