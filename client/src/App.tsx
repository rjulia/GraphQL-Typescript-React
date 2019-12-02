import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import MyButton from "./Button";
import styled from 'styled-components';
import uuidv4 from 'uuid/v4';

const SAVE_CLIKS = gql`
  mutation addClick($input: ClickInput!) {
    addClick(input: $input) {
      id
      color
      timestamp
    }
  }
`;

interface Click {
  id: number;
  color: string
  timestamp: string
}

// const handleClick: any = (color: String) => {
//   console.log(color); // alerts BUTTON
// }

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-around;
`


const App: React.FC = () => {
  const [color, SetColor] = useState('');
  const [saveClick , { error, data }] = useMutation<
    { addClick: Click }
  >(SAVE_CLIKS, {
    variables: { 
      input: { 
        id: uuidv4(), 
        color: color,
        timestamp: new Date() 
      } 
    }
  });

  return (
    <Wrapper>
      {error ? <p>Oh no! {error.message}</p> : null}
      {console.log(data)}
      {data && data.addClick ? <p>Saved!</p> : null}
      <MyButton 
        symbol={"-"} 
        handleClick={async (color) => {
          await SetColor(color)
          await saveClick()
        }} 
        myClassName={'orange'} />
      <MyButton 
        symbol={"+"} 
        handleClick={async (color) => {
          await SetColor(color)
          await saveClick()
        }}  
        myClassName={'blue'} />
    </Wrapper>
  );
}

export default App;
