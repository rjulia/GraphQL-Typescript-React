import React, { FunctionComponent } from 'react';
import styled from 'styled-components';

interface ButtonsProps {
  handleClick: (color: string) => void;
  myClassName: string;
  symbol: string
}

const StyledButton = styled.button`
  width: 300px;
  height: 300px;
  background-color: ${props => props.className};
  border-radius: 100%;
  color: white;
  font-size: 100px;
  cursor: pointer;
  margin: 50px;
`;

const MyButton: FunctionComponent<ButtonsProps> = ({ myClassName, handleClick, symbol }) => {
  return <StyledButton className={myClassName} onClick={(event) => handleClick(myClassName)}>{symbol}</StyledButton>
};



export default MyButton;