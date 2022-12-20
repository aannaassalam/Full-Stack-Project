import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import DataProcessor from "../../hooks/dataProcessor";

function AreaChart({ chartOptions, data }) {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "region",
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
        fill: {
          target: "origin",
          above: "#ffc23440",
        },
        // fillColor: "#eee",
        data: [],
      },
    ],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const dataCount = DataProcessor(data, "region");
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
    <Line
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
          //   responsive: true,
        },
        scales: {
          x: {
            grid: {
              display: false,
            },
          },
          y: {
            grid: {
              display: false,
            },
          },
        },
      }}
    />
  );
}

export default AreaChart;
