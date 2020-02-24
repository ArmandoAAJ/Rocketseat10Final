/* eslint-disable react/button-has-type */
import React from 'react';
import { Link } from 'react-router-dom';
import { MdAdd } from 'react-icons/md';
import { Container, Content } from './styles';
import Table from './Table';
import Header from '~/components/Header';

export default function Dashboard() {
  return (
    <Container>
      <Header />
      <Content>
        <nav>
          <h2>Gerenciando Encomendas</h2>
        </nav>
        <div>
          <input type="text" placeholder="Buscar por encomendas" />
          <Link to="/students">
            <button>
              <MdAdd size={19} />
              &nbsp;Cadastrar
            </button>
          </Link>
        </div>
        <Table />
      </Content>
    </Container>
  );
}
