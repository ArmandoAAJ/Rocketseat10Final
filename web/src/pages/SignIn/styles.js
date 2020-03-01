import styled from 'styled-components';

export const Container = styled.div`
  height: 100%;
  min-height: 100vh;
  background: #7d40e7;
  display: flex;
  justify-content: center;
  align-items: center;

  div {
    height: 400px;
    border-radius: 4px;
    background: #ffffff;
    box-shadow: 0px 0px10px rgba(0, 0, 0, 0.2);
    width: 100%;
    max-width: 315px;
    text-align: center;

    img {
      width: 200px;
      margin-top: 40px;
    }

    form {
      display: flex;
      flex-direction: column;
      margin-top: 30px;
      padding: 0 30px 0;
    }

    input {
      height: 35px;
      border-radius: 4px;
      border-width: 1px;
      border-color: rgba(0, 0, 0, 0.3);
      padding: 4px;
    }

    input + h4 {
      margin-top: 25px;
    }

    input + span + h4 {
      margin-top: 25px;
    }

    input + button {
      margin-top: 25px;
    }

    input + span + button {
      margin-top: 25px;
    }

    span {
      color: red;
      font-weight: bold;
      font-size: 10px;
      margin-top: 2px;
    }

    h4 {
      margin-bottom: 2px;
      text-align: left;
      color: rgba(0, 0, 0, 0.6);
    }

    button {
      height: 40px;
      border-radius: 4px;
      border: none;
      background: #7d40e7;
      color: #eee;
      transition: background 0.9s;
      font-size: 18px;

      &:hover {
        background: #4b0082;
      }

      div {
        margin-left: 50%;
        border: 3px solid #fff;
        border-top: 3px solid #7d40e7;
        border-radius: 50%;
        width: 25px;
        height: 25px;
        animation: spin 1s linear infinite;
        background: #7d40e7;
      }

      @keyframes spin {
        0% {
          transform: rotate(0deg);
        }
        100% {
          transform: rotate(360deg);
        }
      }
    }
  }
`;
