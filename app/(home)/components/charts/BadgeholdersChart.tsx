"use client";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Doughnut, Bar, Line } from "react-chartjs-2";
import { faker } from "@faker-js/faker";

const BadgeholdersChart = () => {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  );

  const labels = ["Round 2", "Round 3", "Round 4"];

  const data = {
    labels,
    datasets: [
      {
        label: "Amount of Badgeholders",
        data: labels.map(() => faker.number.int({ min: 0, max: 1000 })),
        backgroundColor: "rgba(255, 99, 132, 1)",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Amount of Badgeholders per round",
      },
    },
  };

  return <Line options={options} data={data} />;
};

export default BadgeholdersChart;
