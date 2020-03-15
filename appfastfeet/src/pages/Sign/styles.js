import styled from 'styled-components/native';

import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.View`
  flex: 1;
  background-color: 'rgb(125, 64, 231)';

  justify-content: center;
  align-items: center;
`;

export const Input = styled.TextInput`
  padding-left: 15px;
  margin-top: 30px;
  background-color: #fff;
  width: 90%;
  height: 50px;
  border-radius: 4px;
`;

export const Button = styled(RectButton)`
  width: 90%;
  height: 50px;
  align-items: center;
  justify-content: center;
  background: #82bf18;
  margin-top: 20px;
  border-radius: 4px;
`;

export const Text = styled.Text`
  color: #fff;
  font-weight: bold;
  font-size: 16px;
`;
