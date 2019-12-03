import * as React from 'react'
import styled from 'styled-components';



interface SquareProps {
  color: string,
  clicks: number
}


const Square: React.FC<SquareProps> = (props) => {
  const Layout = styled.div`
    display: flex;
    width: 50%;
    max-width: 500px;
    margin: 5px;
    height: 200px;
    min-width: 200px;
    justify-content: center;
    align-items: center
  `
  const NumberBox = styled.span`
    font-size: 50px;
    color: #ffffff
  `
  return (
    <Layout style={{ backgroundColor: props.color }}>
      <NumberBox>{props.clicks}</NumberBox>
    </Layout>
  );
}

export default Square