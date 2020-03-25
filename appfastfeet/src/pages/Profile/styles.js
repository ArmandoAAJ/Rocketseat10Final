import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.View`
  background-color: #fff;
  flex: 1;
`;

export const BoxImage = styled.View`
  margin-top: 70px;
  align-items: center;
  justify-content: center;
`;

export const BoxDetails = styled.View`
  margin-top: 45px;
  padding: 0 20px;
`;

export const TextTitle = styled.Text`
  font-size: 13px;
  color: rgb(125, 125, 125);
  padding-bottom: 4px;
`;

export const TextDados = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: rgb(68, 68, 68);
  padding-bottom: 10px;
`;

export const Button = styled(RectButton)`
  margin-right: 5%;
  margin-left: 5%;
  width: 90%;
  height: 50px;
  align-items: center;
  justify-content: center;
  background-color: 'rgb(231, 64, 64)';
  margin-top: 10px;
  border-radius: 4px;
`;

export const Text = styled.Text`
  color: #fff;
  font-weight: bold;
  font-size: 16px;
`;
