import styled from 'styled-components';

export const Container = styled.div`
  height: 100%;
  background: #eee;
`;

export const Content = styled.div`
  max-width: 1000px;
  margin: 30px auto;

  nav {
    margin-top: 30px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    div {
      display: flex;
      flex-direction: row;
    }
  }

  button {
    height: 30px;
    padding: 0 15px;
    border-radius: 4px;
    border: 1px solid #eee;
    background: #a9a9a9;
    color: white;
    align-items: center;
    display: flex;
    justify-content: center;
  }

  .last {
    margin-left: 10px;
    height: 30px;
    padding: 0 15px;
    border-radius: 4px;
    border: 1px solid #eee;
    background: #715c91;
    color: white;
    align-items: center;
    display: flex;
    justify-content: center;
  }
`;

export const StudentsContent = styled.div`
  min-width: 600px;
  display: flex;
  flex-direction: column;
  margin-top: 15px;
  height: 0 auto;
  border: 1px transparent #eee;
  border-radius: 4px;
  background: white;
  padding: 30px;

  .select {
    display: flex;
    flex-direction: row;

    label {
      margin-bottom: 2%;
      width: 100%;
    }

    label + label {
      margin-left: 3%;
    }

    /* gerada automáticamente pelo uso do rect select */
    .css-2b097c-container {
      margin-top: 2%;
    }
  }
  input {
    margin-top: 5px;
    padding: 5px;
    margin-bottom: 20px;
    border: 1px solid #ddd;
    border-radius: 4px;
    height: 40px;
    width: 100%;
  }
`;
