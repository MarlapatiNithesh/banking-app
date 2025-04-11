"use client";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut as DoughnutChart } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const BankDoughnutChart = ({ accounts }) => {
  const data = {
    datasets: [
      {
        label: "banks",
        data: [1250, 2500, 3750],
        backgroundColor: ["#0747b6", "#2265d8", "#2f91fa"],
      },
    ],
    labels: ["Bank A", "Bank B", "Bank C"],
  };

  return <DoughnutChart data={data} options={
    {
        cutoutPercentage: 60,
        plugins:{
            legend:{
                display:false,
            }
        }
    }
  }/>; 
    
};

export default BankDoughnutChart;
