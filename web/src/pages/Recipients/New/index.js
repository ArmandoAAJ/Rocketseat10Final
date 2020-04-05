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

export default function New() {
  async function handleSubmit({
    name,
    email,
    rua,
    numero,
    complemento,
    cidade,
    estado,
    cep,
  }) {
    try {
      const response = await api.post('recipients', {
        name,
        email,
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
      <Form onSubmit={handleSubmit}>
        <Content>
          <nav>
            <h2>Criação de Destinatário</h2>
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
            <Input type="text" name="name" required />
            <div>
              <label className="street">
                Rua
                <Input type="text" name="rua" required />
              </label>
              <label>
                Número
                <Input name="numero" required />
              </label>
              <label>
                Complemento
                <Input type="text" name="complemento" />
              </label>
            </div>
            <div>
              <label>
                Cidade
                <Input type="text" name="cidade" required />
              </label>
              <label>
                Estado
                <Input
                  type="text"
                  name="estado"
                  maxLength="2"
                  pattern="[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$"
                  required
                />
              </label>
              <label>
                Cep
                <Input name="cep" maxLength="8" pattern="[0-9]+$" required />
              </label>
            </div>
          </StudentsContent>
        </Content>
      </Form>
    </Container>
  );
}
