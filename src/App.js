import "./App.css";
import "react-input-range/lib/css/index.css";
import Sidebar from "./components/sidebar/sidebar";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import { useEffect, useState } from "react";
import BarChart from "./components/Charts/BarChart";
import LineChart from "./components/Charts/LineChart";
import PolarAreaChart from "./components/Charts/PolarAreaChart";
import AreaChart from "./components/Charts/AreaChart";
import axios from "axios";
import PieChart from "./components/Charts/PieChart";
import DoughnutChart from "./components/Charts/DoughnutChart";
import Loader from "./components/loader/loader";

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const init = (setLoading) => {
    setLoading(true);
    axios
      .get("https://full-stack-project-upro.onrender.com/api/")
      .then((res) => {
        setData(res.data);
        setLoading(false);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => init(setLoading), []);

  if (loading) return <Loader />;

  return (
    <div className="App">
      <Sidebar reset={(func) => init(func)} setData={setData} />
      <main className={data.length === 0 && "no-data"}>
        {data.length > 0 ? (
          <div className="internal">
            <div className="analytics-card">
              <h3 className="text-primary">Intensity</h3>
              <BarChart data={data} type="intensity" />
            </div>
            <div className="analytics-card">
              <h3 className="text-primary">Likelihood</h3>
              <LineChart data={data} />
            </div>
            <div className="d-flex">
              <div className="item-span">
                <div className="analytics-card">
                  <h3 className="text-primary">Country</h3>
                  <PieChart data={data} type="country" />
                </div>
                <div className="analytics-card">
                  <h3 className="text-primary">Year</h3>
                  <DoughnutChart data={data} />
                </div>
                <div className="analytics-card">
                  <h3 className="text-primary">Topic</h3>
                  <PieChart data={data} type="topic" />
                  {/* <PolarAreaChart data={data} /> */}
                </div>
              </div>
            </div>
            <div className="analytics-card">
              <h3 className="text-primary">Relevance</h3>
              <BarChart data={data} type="relevance" />
            </div>
            <div className="analytics-card">
              <h3 className="text-primary">Region</h3>
              <AreaChart data={data} />
            </div>
          </div>
        ) : (
          <p>No Data Available</p>
        )}
      </main>
    </div>
  );
}

export default App;
