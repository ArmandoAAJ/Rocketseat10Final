/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/prop-types */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/button-has-type */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Modal from 'react-awesome-modal';

import {
  MdCancel,
  MdRemoveRedEye,
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
} from 'react-icons/md';
import { toast } from 'react-toastify';
import { confirmAlert } from 'react-confirm-alert';

import history from '~/services/history';
import { Container, Content, ContentTable, Pagination } from './styles';
import Header from '~/components/Header';
import api from '~/services/api';

export default function Dashboard() {
  const [page, setPage] = useState(1);
  const [totalRows, setTotalRows] = useState(0);
  const [problems, setProblems] = useState([]);
  const [visible, setVisible] = useState(false);
  const [description, SetDescription] = useState();

  useEffect(() => {
    async function loadData() {
      const response = await api.get('problems', {
        params: { page },
      });
      try {
        const total = response.data.count / 5;
        if (total % 1 === 0) {
          setTotalRows(total);
        } else {
          const x = Math.trunc(total);
          setTotalRows(x + 1);
        }
        setProblems(response.data.rows);
      } catch (error) {
        const total = response.data.count / 5;
        if (total % 1 === 0) {
          setTotalRows(total);
        } else {
          const x = Math.trunc(total);
          setTotalRows(x + 1);
        }
        setProblems(response.data.rows);
      }
    }

    loadData();
  }, []);

  function openModal(problem) {
    SetDescription(problem.description);
    setVisible(true);
  }

  function closeModal() {
    setVisible(false);
  }

  async function handleProblemCancel(id) {
    try {
      await api.delete(`problems/${id}`);
      toast.success('Encomenda cancelada com sucesso');
      history.push(`problemas`);
    } catch (err) {
      toast.error(err.response.data.ERRO);
    }
  }

  function confirmProblemCancel(id) {
    confirmAlert({
      title: 'Cancelar Encomenda',
      message: 'Você está certo disso? Não poderá desfazer está ação!',
      buttons: [
        {
          label: 'Sim',
          onClick: () => handleProblemCancel(id),
        },
        {
          label: 'Não',
          onClick: () => {},
        },
      ],
    });
  }

  function handlePage(action) {
    setPage(action === 'back' ? page - 1 : page + 1);
  }

  return (
    <Container>
      {/* Falta fazer a parte da img que está vindo fixa  */}
      <Modal
        visible={visible}
        width="400"
        height="350"
        effect="fadeInDown"
        onClickAway={() => closeModal()}
      >
        <div className="modal">
          <h4>Vizualizar problema</h4>
          <p>{description}</p>
        </div>
      </Modal>

      <Header />
      <Content>
        <nav>
          <h2>Gerenciando Problemas</h2>
        </nav>
        <ContentTable>
          {problems.length > 0 ? (
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Problema</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {problems.map(problem => (
                  <tr key={problem.id}>
                    <td>
                      {problem.order_id < 10
                        ? `# 0${problem.order_id}`
                        : `# ${problem.order_id}`}
                    </td>
                    <td>{problem.description}</td>
                    <td>
                      {/* Não consegui fazer o clic então criei 3 botões separados  */}
                      <button
                        className="icons"
                        onClick={() => openModal(problem)}
                      >
                        <MdRemoveRedEye color="#6A5ACD" />
                      </button>
                      <Link onClick={() => confirmProblemCancel(problem.id)}>
                        <button className="icons">
                          <MdCancel color="#B22222" />
                        </button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <h3>não há nada por aqui :/</h3>
          )}
        </ContentTable>
        {problems.length > 0 ? (
          <Pagination>
            <button
              type="button"
              disabled={page < 2}
              onClick={() => handlePage('back')}
            >
              <MdKeyboardArrowLeft size={30} />
            </button>
            <span>Página {page}</span>
            <button
              type="button"
              onClick={() => handlePage('next')}
              disabled={page === totalRows}
            >
              <MdKeyboardArrowRight size={30} />
            </button>
          </Pagination>
        ) : (
          ''
        )}
      </Content>
    </Container>
  );
}
