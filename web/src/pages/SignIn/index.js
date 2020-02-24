/* eslint-disable react/button-has-type */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Form feito pela Rocketseat para faciliar o uso de formulários
// Para usar basta criar uma função que recebe os dados passados via name
// E passar a função via onSubmit={função} no form
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import { Container } from './styles';
import logo from '~/assets/logo.png';

import { loginRequest } from '~/store/modules/autenticacao/action';

// Utiliza-se o Yup para validar campo de uma forma prática e exibir esses erros
// No form utiliza-se schema={...} o nome da constante que valida
// Para estilizar basta criar um span no styles

const validation = Yup.object().shape({
  email: Yup.string()
    .email('Insira um email válido')
    .required('O e-mail é obrigatório'),
  password: Yup.string().required('A senha é obrigatória'),
});

export default function SignIn() {
  const dispatch = useDispatch();
  const loading = useSelector(state => state.autenticacao.loading);

  function handleSubmit({ email, password }) {
    dispatch(loginRequest(email, password));
  }

  return (
    <Container>
      <div>
        <img src={logo} alt="logo" />
        <Form onSubmit={handleSubmit} schema={validation}>
          <h4>SEU EMAIL</h4>
          <Input name="email" type="email" placeholder="exemplo@email.com" />
          <h4>SUA SENHA</h4>
          <Input name="password" type="password" placeholder="*****" />
          <button>{loading ? <div /> : 'Acessar aplicação'}</button>
        </Form>
      </div>
    </Container>
  );
}
