import React, { useContext, useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import { SocketContext } from '../context/SocketContext';

interface BandData {
    id:number,
    name:string,
    votos: number
}


export const BandChart = () => {
  const { socket } = useContext(SocketContext);
  const chartRef:any = useRef(null); // Usamos useRef para mantener una referencia al gráfico

  useEffect(() => {
    socket.on('current-bands', (data: BandData[]) => {
      console.log(data);
      crearGraficas(data);
    });
  }, [socket]);

  const crearGraficas = (data:BandData[]) => {
    const ctx:any = document.getElementById('myChart');

    // Verifica si ya existe un gráfico en el elemento canvas
    if (chartRef.current) {
      chartRef.current.destroy(); // Destruye el gráfico existente
    }

    const myChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: data.map(band =>band.name),
        datasets: [{
            label: '# of Votes',
            data: data.map(band =>band.votos),
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 25,1)',
            ],
            borderWidth: 1
        }],
    },
      options: {
        scales: {
          x: {
            stacked: true,
          },
        },
      },
    });

    // Asigna el gráfico a la referencia para futuras destrucciones
    chartRef.current = myChart;
  };

  return <canvas id="myChart"></canvas>;
};