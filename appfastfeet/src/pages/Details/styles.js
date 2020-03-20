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
  min-height: 180px;
  max-height: 220px;
`;

export const BoxInfo = styled.View`
  display: flex;
  flex-direction: row;
`;

export const TextInfo = styled.Text`
  margin-left: 10px;
  font-weight: bold;
  color: 'rgb(125, 64, 231)';
`;

export const TextTitle = styled.Text`
  margin-top: 3px;
  font-size: 13px;
  font-weight: bold;
  color: 'rgb(161, 161, 161)';
`;

export const TextDesc = styled.Text`
  margin-top: 5px;
  margin-bottom: 7px;
  font-size: 15px;
  color: 'rgb(140, 140, 140)';
`;

export const BoxSituation = styled.View`
  margin-top: 4px;
  margin-right: 20px;
  margin-left: 20px;
  padding: 10px;
  background-color: 'rgb(255,255,255)';
  border-radius: 5px;
  border: 1px solid #eee;
  min-height: 90px;
  max-height: 200px;
`;

export const BoxInfoSituation = styled.View`
  display: flex;
  flex-direction: row;
`;

export const TextTitleDataR = styled.Text`
  margin-top: 3px;
  font-size: 13px;
  font-weight: bold;
  color: 'rgb(161, 161, 161)';
`;

export const TextTitleDataE = styled.Text`
  margin-top: 3px;
  font-size: 13px;
  font-weight: bold;
  color: 'rgb(161, 161, 161)';
  margin-left: auto;
`;

export const BoxData = styled.View`
  display: flex;
  flex-direction: column;
`;

export const BoxDataE = styled.View`
  display: flex;
  flex-direction: column;
  margin-left: auto;
`;

export const BoxButtom = styled.View`
  display: flex;
  flex-direction: row;
  min-height: 90px;
  max-height: 200px;
  margin-top: 4px;
  margin-left: 20px;
  margin-right: 20px;
  border-radius: 5px;
  background-color: 'rgb(248, 249, 253)';
`;

export const Problem = styled(RectButton)`
  width: 33%;
  align-items: center;
  justify-content: center;
`;

export const ViewProblem = styled(RectButton)`
  width: 33%;
  align-items: center;
  justify-content: center;
`;

export const Confirm = styled(RectButton)`
  width: 33%;
  align-items: center;
  justify-content: center;
`;

export const TextProblem = styled.Text`
  text-align: center;
`;
