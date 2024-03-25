"use client";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
} from "chart.js";
// import { Line } from "react-chartjs-2";
// import { Attestation } from "@/lib/types";

const TokenChart = () => {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Filler,
    Tooltip,
  );

  // const labels = ["Round 2", "Round 3"];
  //
  // const options = {
  //   responsive: true,
  // };

  return <p>Hello wolrd</p>;
};

export default TokenChart;
