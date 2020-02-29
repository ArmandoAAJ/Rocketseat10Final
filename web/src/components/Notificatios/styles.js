import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
`;

export const Badge = styled.button`
  margin-left: 90%;
  background: none;
  border: 0;
  position: relative;
`;

export const List = styled.div`
  border-radius: 4px;
  position: absolute;
  width: 100px;
  left: calc(50% - 20px);
  top: calc(100% + 5px);
  background: #ffff;
  padding: 15px 5px;
  display: ${props => (props.visible ? 'block' : 'none')};

  &::before {
    content: '';
    position: absolute;
    left: calc(50% - 5px);
    top: -5px;
    width: 0;
    height: 0;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-bottom: 5px solid #eee;
  }
`;

export const Options = styled.div`
  color: #fff;

  p {
    font-size: 13px;
    line-height: 18px;
  }
`;
