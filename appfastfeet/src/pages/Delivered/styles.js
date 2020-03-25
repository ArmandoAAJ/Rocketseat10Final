import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.View`
  flex: 1;
  padding: 15px;
  background-color: 'rgb(255, 255, 255)';
`;

export const Header = styled.View`
  display: flex;
  flex-direction: row;
  padding-bottom: 10px;
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
  padding-right: 5px;
  font-size: 13px;
  color: 'rgb(191, 191, 191)';
`;

export const TextLinkE = styled.Text`
  font-size: 13px;
  color: 'rgb(170, 129, 239)';
  font-weight: bold;
  text-decoration: underline;
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

export const BoxPogress = styled.View`
  display: flex;
  flex-direction: column;
  padding: 0 20px;
`;

export const ProgressBar = styled.View`
  display: flex;
  flex-direction: row;
  height: 30px;
  align-items: center;
  justify-content: center;
`;

export const DotHolder = styled.View`
  align-items: center;
  justify-content: center;
  flex-direction: row;
`;

export const Dot = styled.View`
  height: 12px;
  width: 12px;
  border: 1px solid #7d40e7;
  background: ${props => (props.done ? '#7d40e7' : '#fff')};
  border-radius: 6px;
`;

export const Line = styled.View`
  width: 40%;
  border: 1px solid #7d40e7;
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

export const TextDetails = styled.Text`
  font-size: 14px;
  color: 'rgb(125, 64, 231)';
  font-weight: bold;
`;

export const LinkDetails = styled(RectButton)`
  background-color: 'rgb(240, 240, 245)';
`;
