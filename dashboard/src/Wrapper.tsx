import React from "react";
import gql from "graphql-tag";
import LineChart from './Chart';
import { useSubscription } from "@apollo/react-hooks";
import './Wrapper.css'

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

  const { data } = useSubscription(CLICKS_SUBSCRIPTION);
  return (
    <>
      <div className="main chart-wrapper">

        <LineChart
          data={data}
        />
      </div>
    </>
  )

}


export default Wrapper