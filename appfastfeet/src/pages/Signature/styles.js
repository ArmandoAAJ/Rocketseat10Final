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
  position: absolute;
  width: 90%;
  margin-right: 5%;
  margin-left: 5%;
  height: 70%;
  margin-top: 60px;
  background-color: 'rgb(255,255,255)';
  border-radius: 5px;
  border: 1px solid #eee;
`;

export const Photo = styled.ImageBackground`
  height: 100%;
  width: 100%;
`;

export const BoxPhoto = styled.View`
  align-items: center;
  justify-content: center;
  margin-top: 70%;
`;

export const StartPhoto = styled(RectButton)`
  background-color: rgba(90, 90, 90, 0.8);
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 80px;
  border-radius: 40px;
`;

export const Button = styled(RectButton)`
  margin-right: 5%;
  margin-left: 5%;
  width: 90%;
  height: 50px;
  align-items: center;
  justify-content: center;
  background-color: 'rgb(125, 64, 231)';
  margin-top: 5px;
  border-radius: 4px;
`;

export const Text = styled.Text`
  color: #fff;
  font-weight: bold;
  font-size: 16px;
`;
