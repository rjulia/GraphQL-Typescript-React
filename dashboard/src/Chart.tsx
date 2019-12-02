import React, { useEffect, useState, FunctionComponent } from 'react';

import { Line } from 'react-chartjs-2';
import {
  XYPlot,
  XAxis,
  YAxis,
  HorizontalGridLines,
  VerticalGridLines,
  LineSeries
} from 'react-vis';

interface Click {
  id: string,
  color: string,
  timestamp: Date
}

type GraphProps = {
  data: {
    newClicks: [Click]
  }
}




const options = {
  legend: {
    display: false,
  },
  maintainAspectRatio: true
}
const orangeData: Array<Number> = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
const blueData: Array<Number> = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
const allData: Array<Number> = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
const dataMy = {
  labels: ['0', '0.5', '1', '1.5', '2', '2.5', '3', '3.5', '4', '4.5', '5'],
  datasets: [
    {
      label: 'Click',
      fill: false,
      borderColor: '#000',
      data: allData
    },
    {
      label: 'Blue',
      fill: false,
      borderColor: '#1721FF',
      data: orangeData
    },
    {
      label: 'Orange',
      fill: false,
      borderColor: '#FF7E05',
      data: blueData
    }
  ]
};


const Chart: FunctionComponent<GraphProps> = (data) => {
  const [dataChart, setDataChart] = useState(dataMy)

  useEffect(() => {
    if (data.data) {
      handleUpdate(data.data)
    }
  }, [data])

  const handleUpdate: any = (data: any) => {

    console.log(data.newClicks)
    if (data.newClicks) {

      dataMy.datasets[0].data = [0, 0, 2, 0, 0, 3, 0, 0, 0, 0, 0]
      setDataChart(dataMy)
    }
    return dataChart
  }
  return (
    <>
      {/* <Line
        data={() => handleUpdate}
        width={100}
        height={100}
        options={options}
        redraw /> */}
      <XYPlot xType="linear" width={300} height={300}>
        <HorizontalGridLines />
        <VerticalGridLines />
        <XAxis title="X Axis" />
        <YAxis title="Y Axis" />
        <LineSeries
          data={[{ x: 1, y: 3 }, { x: 2, y: 5 }, { x: 3, y: 15 }, { x: 4, y: 12 }]}
        />
        <LineSeries data={null} />
        <LineSeries
          data={[{ x: 1, y: 10 }, { x: 2, y: 4 }, { x: 4, y: 2 }, { x: 5, y: 15 }]}
        />
      </XYPlot>
    </>
  );

};


export default Chart