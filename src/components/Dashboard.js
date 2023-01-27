import React, { PureComponent, useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import axios from "axios";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const [Chartdata, setChartData] = useState([]);
  const [loader, setLoader] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setLoader(true);
    }, 1000);
    for (let i = 1; i <= 10; i++) {
      axios
        .get(
          `https://jsonplaceholder.typicode.com/todos?userId=${i}&completed=true`
        )
        .then((res) => {
          const userId = i;
          const completed = res?.data?.length;
          const Pending = 20 - completed;

          const entries = { userId, completed, Pending };
          Chartdata.push(entries);
        })
        .catch((err) => console.log(err));
    }
  }, [Chartdata]);

  console.log(Chartdata);

  let sortedId = Chartdata.sort(
    (u1, u2) => (u1.userId < u2.userId) ? -1 : (u1.userId > u2.userId) ? 1 : 0);

  const data = {
    labels:
    sortedId?.length !== 0
        ? sortedId.map((x) => x.userId)
        : sortedId.map((x) => x.userId),
    datasets: [
      {
        label: "Completed",
        data:
          Chartdata?.length !== 0
            ? Chartdata.map((x) => x.completed)
            : Chartdata.map((x) => x.completed),
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Incomplete",
        data:
          Chartdata?.length !== 0
            ? Chartdata.map((x) => x.Pending)
            : Chartdata.map((x) => x.Pending),
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  const options = {
    indexAxis: "x",
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    responsive: true,
    plugins: {
      tooltip: {
        backgroundColor: "#fff",
        bodyColor: "#000",
        borderColor: "#000",
        borderWidth: 1,
        padding: 10,
        titleColor: "#000",
        yAlign: "bottom",
        titleFont: "bold",
        callbacks: {},
      },
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Number of Task by Each Users",
      },
    },
  };

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-12">
            {loader === false ? (
              <div className="spinner-border" role="status">
                <span class="sr-only"></span>
              </div>
            ) : (
              <div className="chart">
                <Bar options={options} data={data} />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
