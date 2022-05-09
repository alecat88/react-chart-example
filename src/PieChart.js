import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export function PieChart() {
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
            let apiPromise = await fetch("https://swapi.dev/api/starships");
            const dataFromApi = await apiPromise.json();
            console.log("Result from api", dataFromApi);
            
            //Compose data structure for chart.js
            let labelsArray =  dataFromApi.results.map(item => item.name);
            let maxAtmosperingSpeedArray = dataFromApi.results.map(item => item.max_atmosphering_speed);

            let dataStructure = {
                labels: labelsArray,
                datasets: [
                        {
                          label: 'Max Atmosphering Speed',
                          data: maxAtmosperingSpeedArray,
                          backgroundColor: [
                            '#ff0000',
                            '#ff8000',
                            '#ffff00',
                            '#80ff00',
                            '#00ff00',
                            '#00ff80',
                            '#00ffff',
                            '#0080ff',
                            '#0000ff',
                            '#8000ff',
                            '#ff00ff',
                            '#ff0080',
                          ],
                        }
                      ],
            }
            console.log("Structure of the data to pass to the chart", dataStructure);

            //Storing dataStructure in variable "data" of line 28
            setData(dataStructure)
          }
          fetchData();

    },[]) 

  // Below we return the HTML code that has to be rendered, we pass also the data
  return <Pie data={data} />;

}
