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
import { Line } from "react-chartjs-2";
import { Attestation } from "@/lib/types";

const BadgeholdersChart = ({
  attestations,
}: {
  attestations: Attestation[];
}) => {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Filler,
    Tooltip,
  );

  const labels = ["Round 2", "Round 3"];
  const dataCounts = labels.map((label) => {
    const roundNumber = parseInt(label.split(" ")[1]!, 10);
    return attestations.filter((attestation) => {
      return (
        attestation.decodedDataJson[0]?.value?.value === roundNumber.toString()
      );
    }).length;
  });

  const data = {
    labels,
    datasets: [
      {
        fill: true,
        label: "Amount of Badgeholders",
        data: dataCounts,
        backgroundColor: "lightblue",
      },
    ],
  };

  const options = {
    responsive: true,
  };

  return <Line options={options} data={data} />;
};

export default BadgeholdersChart;
