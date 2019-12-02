import React from "react";
import gql from "graphql-tag";
import Chart from './Chart'
import { useSubscription } from "@apollo/react-hooks";


interface Click {
  id: string,
  color: string,
  timestamp: Date
}


const CLICKS_SUBSCRIPTION = gql`
    subscription newClicks {
      newClicks {
        id
        color
        timestamp
      }
    }
  `;

const Wrapper: React.FC = () => {
  type GraphProps = {
    newClicks: [Click]
  }
  const { data } = useSubscription(CLICKS_SUBSCRIPTION);
  return <Chart data={data} />

}


export default Wrapper