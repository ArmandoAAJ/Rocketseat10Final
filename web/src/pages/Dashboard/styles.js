import styled from 'styled-components';

export const Container = styled.div`
  height: 100%;
  min-height: 100vh;
  background: #eee;
`;

export const Content = styled.div`
  max-width: 1000px;
  margin: 50px auto;
  display: flex;
  flex-direction: column;
  align-items: left;

  div {
    margin-top: 30px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  button {
    height: 30px;
    padding: 0 15px;
    border-radius: 4px;
    border: 1px solid #eee;
    background: #ee4d64;
    color: white;
    margin-right: 10px;
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
