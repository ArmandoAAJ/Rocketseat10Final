import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.View`
  flex: 1;
  background-color: 'rgb(255, 255, 255)';
`;
export const Header = styled.View`
  height: 140px;
  background-color: 'rgb(125, 64, 231)';
`;
export const Box = styled.View`
  margin-top: 60px;
  margin-right: 20px;
  margin-left: 20px;
  padding: 10px;
  background-color: 'rgb(255,255,255)';
  border-radius: 5px;
  border: 1px solid #eee;
  min-height: 300px;
  max-height: auto;
`;

export const Input = styled.TextInput`
  font-size: 16px;
  background-color: #fff;
  width: 100%;
  max-height: auto;
  border-radius: 4px;
`;

export const Button = styled(RectButton)`
  height: 50px;
  align-items: center;
  justify-content: center;
  background: #7d40e7;
  margin-top: 10px;
  margin-right: 20px;
  margin-left: 20px;
  border-radius: 4px;
`;

export const Text = styled.Text`
  color: #fff;
  font-weight: bold;
  font-size: 16px;
`;
