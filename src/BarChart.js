import React, { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Chart.js using api from https://swapi.dev/',
    },
  },
};

export function BarChart() {
    //Providing empty structure so the chart can be visualized before the API are query
    let initialDataStructure = {
        labels: [],
        datasets: [],
    }

    //Setting the data structure to the "data" variable
    let [data, setData] = useState(initialDataStructure);

    useEffect(() => { //This function is executed only once, when the web page loads.

        async function fetchData() {
            //Query API
            let apiPromise = await fetch("https://swapi.dev/api/people");
            const dataFromApi = await apiPromise.json();
            console.log("Result from api", dataFromApi);
            
            //Compose data structure for chart.js
            let labelsArray =  dataFromApi.results.map(item => item.name);
            let heightsArray = dataFromApi.results.map(item => item.height);
            let massArray = dataFromApi.results.map(item => item.mass);

            let dataStructure = {
                labels: labelsArray,
                datasets: [
                        {
                          label: 'Heights',
                          data: heightsArray,
                          backgroundColor: 'rgba(255, 99, 132, 0.5)',
                        },
                        {
                          label: 'Mass',
                          data: massArray,
                          backgroundColor: 'rgba(53, 162, 235, 0.5)',
                        },
                      ],
            }
            console.log("Structure of the data to pass to the chart", dataStructure);

             //Storing dataStructure in variable "data" of line 43
            setData(dataStructure)
          }
          fetchData();

    },[]) 

  // Below we return the HTML code that has to be rendered, we pass also the data and the options
  return <Bar options={options} data={data} />;

}
