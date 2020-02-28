/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/button-has-type */

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Select from 'react-select';
// import { Input } from '@rocketseat/unform';
import { MdDone, MdChevronLeft } from 'react-icons/md';
import { Container, Content, StudentsContent } from './styles';
import Header from '~/components/Header';
import api from '~/services/api';

export default function New() {
  const [deliverymans, setDeliverymans] = useState();
  const [recipients, setRecipients] = useState([]);

  useEffect(() => {
    async function loadSelect() {
      const responseDeliveryman = await api.get('deliverymans');
      const responseRecipients = await api.get('recipients');

      const data = responseDeliveryman.data.map(d => ({
        value: d.id,
        label: d.name,
      }));

      setRecipients(responseRecipients.data);
      setDeliverymans(data);
    }
    loadSelect();
  }, []);

  return (
    <Container>
      <Header />
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
            <Link to="/novaencomenda">
              <button className="last">
                <MdDone size={19} />
                &nbsp;Salvar
              </button>
            </Link>
          </div>
        </nav>
        <StudentsContent>
          <div className="select">
            <label>
              Destinatário
              <Select name="" options={deliverymans} placeholder="Plano" />
            </label>
            <label>
              Entregador
              <Select />
            </label>
          </div>
          <label> Nome do Produto</label>
          <input placeholder="Digite o nome do produto" />
        </StudentsContent>
      </Content>
    </Container>
  );
}
