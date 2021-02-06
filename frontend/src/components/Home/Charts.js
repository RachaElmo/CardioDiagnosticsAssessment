import React, { useMemo,useEffect } from 'react'
import {useTable} from 'react-table'
import './table.css'
import { Line } from "react-chartjs-2";
export const Charts = (props)=>{
    const chartdata = {
        labels: props.graphLabels,
        datasets: [
          {
            label: "Heart Rate (BPM)",
            data: props.graphData,
            fill: false,
            borderColor: "#438772",
            options: {
                scales: {
                    xAxes: [{
                        ticks: {
                            autoSkip: false,
                            maxRotation: 90,
                            minRotation: 90
                        }
                    }]
                }
            }
          }
        ]
      };

    return (console.log(props.graphData,props.graphLabels),
        <Line data={chartdata} />
    )
}
export default Charts;