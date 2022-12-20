import React, { useEffect, useState } from "react";
import { PolarArea } from "react-chartjs-2";
import DataProcessor from "../../hooks/dataProcessor";

function PolarAreaChart({ chartOptions, data }) {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Intensity",
        backgroundColor: [
          "#36a2eb",
          "#ff6384",
          "#4bc0c0",
          "#ff9f40",
          "#9966ff",
          "#ffcd56",
        ],
        borderColor: "#000",
        borderWidth: 2,
        fill: true,
        data: [],
      },
    ],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const dataCount = DataProcessor(data, "intensity");
    setChartData((prev) => ({
      labels: Object.keys(dataCount),
      datasets: [
        {
          ...prev.datasets[0],
          data: Object.values(dataCount),
        },
      ],
    }));
    setLoading(false);
  }, [data]);

  if (loading) return "Loading...";

  return (
    <PolarArea
      data={chartData}
      options={{
        plugins: {
          title: {
            display: false,
            text: "Users Gained between 2016-2020",
          },
          legend: {
            display: false,
          },
        },
      }}
    />
  );
}

export default PolarAreaChart;
