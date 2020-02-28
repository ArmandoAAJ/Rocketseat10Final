import React from 'react';

import { Link } from 'react-router-dom';
import { MdAdd } from 'react-icons/md';
import { Container, Content } from './styles';
import Header from '~/components/Header';

export default function New() {
  return (
    <Container>
      <Header />
      <Content>
        <nav>
          <h2>Cadastro de Encomendas</h2>
          <div>
            <Link to="/dashboard">
              <button>
                <MdAdd size={19} />
                &nbsp;Voltar
              </button>
            </Link>
            <Link to="/novaencomenda">
              <button>
                <MdAdd size={19} />
                &nbsp;Salvar
              </button>
            </Link>
          </div>
        </nav>
      </Content>
    </Container>
  );
}
