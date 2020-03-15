import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  padding: 15px;
`;

export const Header = styled.View`
  display: flex;
  flex-direction: row;
`;

export const Nav = styled.View`
  padding-left: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const TextSmall = styled.Text`
  font-size: 13px;
  color: #c0c0c0;
`;

export const TextName = styled.Text`
  font-size: 18px;
  font-weight: bold;
`;

export const IconLogout = styled.View`
  justify-content: center;
  margin-left: auto;
`;

export const TextEntregas = styled.Text`
  font-size: 23px;
  font-weight: bold;
`;

export const TextLinkP = styled.Text`
  font-size: 13px;
  color: 'rgb(170, 129, 239)';
  padding-right: 5px;
  text-decoration: underline;
`;

export const TextLinkE = styled.Text`
  font-size: 13px;
  color: 'rgb(191, 191, 191)';
`;

export const Content = styled.View`
  padding-top: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
`;

export const NavLink = styled.View`
  display: flex;
  align-items: center;
  flex-direction: row;
`;

export const Box = styled.View`
  margin-top: 20px;
  border: 1px solid #eee;
  height: 200px;
`;

export const BoxHeader = styled.View`
  padding: 15px;
  display: flex;
  flex-direction: row;
`;

export const TextNumberEncomenda = styled.Text`
  margin-left: 10px;
  font-weight: bold;
  color: 'rgb(125, 64, 231)';
`;

export const BoxFooter = styled.View`
  background-color: 'rgb(240, 240, 245)';
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 80px;
  margin-top: auto;
  padding: 10px;
`;

export const Date = styled.View`
  display: flex;
  flex-direction: column;
`;

export const TextDate = styled.Text`
  font-size: 12px;
  color: 'rgb(188, 189, 190)';
`;

export const TextDateNumber = styled.Text`
  font-size: 14px;
  font-weight: bold;
`;

export const City = styled.View`
  display: flex;
  flex-direction: column;
`;

export const TextCity = styled.Text`
  font-size: 12px;
  color: 'rgb(188, 189, 190)';
`;

export const TextCityName = styled.Text`
  font-size: 14px;
  font-weight: bold;
`;

export const Details = styled.View`
  display: flex;
  flex-direction: column;
`;

export const TextLinkDetails = styled.Text`
  font-size: 13px;
  font-weight: bold;
  color: 'rgb(125, 64, 231)';
`;
