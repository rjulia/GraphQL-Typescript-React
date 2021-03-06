import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import Square from './Square';
import styled from 'styled-components';

const initialState = {
  labels: ['0', '0.5', '1', '1.5', '2', '2.5', '3', '3.5', '4', '4.5', '5'],
  datasets: [
    {
      label: 'Black',
      fill: false,
      borderColor: '#000',
      data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    },
    {
      label: 'Blue',
      fill: false,
      borderColor: '#1721FF',
      data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    },
    {
      label: 'Orange',
      fill: false,
      borderColor: '#FF7E05',
      data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    }
  ]
};
interface Click {
  id: string,
  color: string,
  timestamp: Date
}

interface IntNewClicks {
  newClicks: [Click]
}

interface LineChartProps {
  data: IntNewClicks

}
interface IState {
  datasets?: any;
  labels?: any
}

let dots: number = 0;
let dotsBlue: number = 0;
let dotsOrange: number = 0;

let finalData: Array<number> = []
let finalDataBLue: Array<number> = []
let finalDataOrange: Array<number> = []

let newData = [];
let newDataBlue = [];
let newDataOrange = [];
let secondsNow = 0
let seconds = 0
const LineChart: React.FC<LineChartProps> = ({ data }) => {

  if (data && secondsNow === 0) {
    secondsNow = new Date().getTime()
  }
  const [info, setInfo] = useState(initialState)
  const [orangeNumber, setOrangeNumber] = useState(0)
  const [blueNumber, setBlueNumber] = useState(0)




  if ((data !== undefined) && finalData.length < 10) {
    const { newClicks } = data
    const time = newClicks[newClicks.length - 1].timestamp;
    seconds = new Date().getTime()
    if (newClicks[newClicks.length - 1].color === 'blue') {
      dots = dots + 1
      dotsBlue = dotsBlue + 1
    } else {
      dots = dots - 1
      dotsOrange = dotsOrange + 1
    }

    setTimeout(() => {
      finalData.push(dots)
      finalDataBLue.push(dotsBlue)
      finalDataOrange.push(dotsOrange)
      dots = 0;
      dotsBlue = 0;
      dotsOrange = 0;

    }, 500);

    setTimeout(() => {
      var oldDataSet = info.datasets[0];
      var oldDataSetBlue = info.datasets[1];
      var oldDataSetOrange = info.datasets[2];

      newData = finalData;
      newDataBlue = finalDataBLue;
      newDataOrange = finalDataOrange;

      var newDataSet = {
        ...oldDataSet
      };
      var newDataSetBlue = {
        ...oldDataSetBlue,
      };
      var newDataSetOrange = {
        ...oldDataSetOrange
      };
      newDataSet.data = newData;
      newDataSetBlue.data = newDataBlue;
      newDataSetOrange.data = newDataOrange;

      var newState = {
        ...initialState,
        datasets: [newDataSet, newDataSetBlue, newDataSetOrange]
      };
      setOrangeNumber(newDataSetBlue.data.length)
      setBlueNumber(newDataSetOrange.data.length)
      setInfo(newState)
    }, 5000)
  }

  const Layout = styled.div`
    display: flex;
    width: 100%;
    max-width: 500px;
    margin: 100px auto 0;
    justify-content: space-center;
  `

  return (
    <>
      <Line data={info} />
      <Layout>
        <Square color={'#1721FF'} clicks={blueNumber} />
        <Square color={'#FF7E05'} clicks={orangeNumber} />
      </Layout>
    </>
  );

}


export default LineChart
