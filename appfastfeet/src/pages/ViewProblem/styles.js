import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: 'rgb(255, 255, 255)';
`;
export const Header = styled.View`
  height: 130px;
  background-color: 'rgb(125, 64, 231)';
`;
export const Box = styled.View`
  margin-top: 60px;
  margin-right: 20px;
  margin-left: 20px;
  background-color: 'rgb(255, 255, 255)';
  border-radius: 5px;
  border: 1px solid #fff;
`;

export const BoxProblem = styled.View`
  min-height: 70px;
  padding: 0 5px;
  margin-bottom: 5px;
  border-radius: 5px;
  border: 1px solid #eee;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const TextDescription = styled.Text`
  width: 70%;
  font-size: 14px;
  font-weight: bold;
  color: 'rgb(200,200,200)';
`;

export const TextDate = styled.Text`
  font-size: 10px;
  font-weight: bold;
  color: 'rgb(200,200,200)';
`;
