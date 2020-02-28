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
    background: #715c91;
    color: white;
    align-items: center;
    display: flex;
    justify-content: center;
  }
`;
