import styled from 'styled-components';

export const Container = styled.div`
  height: 100%;
  background: #eee;

  .modal {
    padding: 15px;

    h4 {
      padding-bottom: 8px;
    }

    p {
      padding-bottom: 8px;
    }

    p + h4 {
      padding-top: 8px;
      border-top: 1px solid #eee;
    }
    img {
      padding: 5px;
      width: 350px;
    }
  }
`;

export const Content = styled.div`
  max-width: 1000px;
  margin: 30px auto;

  div {
    margin-top: 30px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  .cadastrar {
    height: 30px;
    padding: 0 15px;
    border-radius: 4px;
    border: 1px solid #eee;
    background: #7d40e7;
    color: white;
    align-items: center;
    display: flex;
    justify-content: center;
  }

  input {
    height: 30px;
    border-radius: 4px;
    border: 1px solid #eee;
    padding: 4px;
  }
`;

export const ContentTable = styled.div`
  table {
    width: 100%;
    border-spacing: 0;

    th {
      text-align: left;
      padding: 0 10px;
    }

    th:last-child {
      text-align: right;
    }

    td {
      border-top: 10px solid #eee;
      background-color: #fff;
      padding: 10px 10px;

      span {
        display: flex;
        justify-content: center;
      }
      .icons {
        border: none;
        margin-left: 2px;
        background-color: #fff;
      }

      div {
        margin: 0;
      }
    }

    td:last-child {
      text-align: right;
    }

    .entregue {
      display: flex;
      list-style-type: none;
      font-size: 11px;
      padding: 3px;
      border-radius: 10px;
      width: 90px;
      color: green;
      background-color: rgba(34, 139, 34, 0.2);
    }

    .cancelado {
      display: flex;
      list-style-type: none;
      font-size: 11px;
      padding: 3px;
      border-radius: 10px;
      width: 90px;
      color: red;
      background-color: rgba(255, 0, 0, 0.2);
    }

    .retirado {
      display: flex;
      list-style-type: none;
      font-size: 11px;
      padding: 3px;
      border-radius: 10px;
      width: 90px;
      color: DarkBlue;
      background-color: rgba(0, 0, 255, 0.2);
    }
  }
  h3 {
    border: 1px solid #eee;
    padding: 5px;
    font-size: 12px;
    border-radius: 4px;
    background-color: red;
    color: #fff;
    margin-left: 40%;
  }
`;

export const Pagination = styled.div`
  display: flex;
  margin-left: 80%;
  span {
    height: 30px;
    padding: 0 15px;
    border-radius: 4px;
    border: 1px solid #eee;
    background: #7d40e7;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  button {
    height: 30px;
    width: 30px;
    border-radius: 4px;
    border: 1px solid #eee;
    background: #7d40e7;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    &:disabled {
      opacity: 0;
    }
  }
`;
