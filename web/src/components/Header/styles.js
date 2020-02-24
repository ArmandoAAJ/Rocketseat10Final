import styled from 'styled-components';

export const Container = styled.div`
  background: #fff;
  padding: 0 30px;
`;

export const Content = styled.div`
  min-width: 600px;
  height: 64px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  nav {
    display: flex;
    align-items: center;

    img {
      height: 30px;
      padding-right: 10px;
      margin-right: 10px;
      border-right: 1px solid #eee;
    }

    a {
      padding-right: 20px;
      font-size: 13px;
      color: #766;
      font-weight: bold;
    }

    .nav-color {
      color: #000;
    }
  }
  aside {
    display: flex;
    align-items: center;
  }

  @media (max-width: 880px) {
    img {
      display: none;
    }
  }
  @media (max-width: 780px) {
    nav {
      a {
        font-size: 13px;
      }
    }
  }
`;

export const Profile = styled.div`
  display: flex;
  margin-left: 20px;
  padding-left: 20px;

  div {
    text-align: right;
    margin-right: 10px;

    strong {
      display: block;
      font-size: 14px;
      color: #333;
    }

    a {
      font-size: 10px;
      color: red;
      font-weight: bold;
    }
  }
`;
