import "./App.css";
import React, { useEffect, useRef, useState } from "react";
import Chart from "./components/Chart";

function App() {
  const MINUTE_MS = 2000;
  const [data, setData] = useState([
    { label: "Guy kaplan", y: 0 },
    { label: "Mike Kogan", y: 0 },
    { label: "Mark Segal", y: 0 },
    { label: "Itzik Naim", y: 0 },
    { label: "Nisim Ben Saadon", y: 0 },
    { label: "Itai Karas", y: 0 },
    { label: "Nitzan Shwartz", y: 0 },
    { label: "Daniel Bresler", y: 0 },
    { label: "Max Zabuty", y: 0 },
    { label: "Roie Maoz", y: 0 },
    { label: "Ron Resnik", y: 0 },
    { label: "Itay Meirson", y: 0 },
    { label: "Ariel Ben", y: 0 },
  ]);
  const [tallestHeights, setTallestHeights] = useState([[], [], []]);
  const makeGrid = {
    display: "grid",
    gridTemplateColumns: `repeat(${data.length.toString()}, 1fr)`,
  };

  useEffect(() => {
    const heightsArray = data.map((item) => item.y);
    let firstPlaces = [[], [], []];
    for (let index = 0; index <= 10; index++) {
      const heighest = Math.max(...heightsArray);
      let sliceAtIndex = heightsArray.indexOf(heighest);
      if (heighest === firstPlaces[0][0] || firstPlaces[0].length === 0) {
        firstPlaces[0].push(...heightsArray.splice(sliceAtIndex, 1));
      } else if (
        heighest === firstPlaces[1][0] ||
        firstPlaces[1].length === 0
      ) {
        firstPlaces[1].push(...heightsArray.splice(sliceAtIndex, 1));
      } else if (
        heighest === firstPlaces[2][0] ||
        firstPlaces[2].length === 0
      ) {
        firstPlaces[2].push(...heightsArray.splice(sliceAtIndex, 1));
      }
    }
    setTallestHeights(firstPlaces);
  }, data);

  useEffect(() => {
    // the origial code uses fetch to load data, but the server is not longer live
    setInterval(() => {
      setData((prevData) =>
        prevData.map((userData) => ({
          ...userData,
          y: userData.y + Math.round(Math.random() * (5 - 0) + 0) * 30,
        }))
      );
      console.log("trying to fetch...");
    }, MINUTE_MS);
  }, []);

  return (
    <div className="app-container">
      <header className="title-container">
        <img
          id="logo"
          src={process.env.PUBLIC_URL + "assests/CytakaLogo-removebg.png"}
        />
        <h1 className="title">{"Cytaka Cyber Championship"}</h1>
        <div className="title-background"></div>
      </header>
      <div className="glow" style={makeGrid}>
        {data.map((chartData, index) => (
          <Chart
            isGlow={true}
            key={index}
            chartData={chartData}
            tallestHeights={tallestHeights}
          />
        ))}
      </div>
      <div className="chart-container" style={makeGrid}>
        {data.map((chartData, index) => (
          <div className="chartgrid" key={index}>
            <Chart
              isGlow={false}
              index={index}
              chartData={chartData}
              data={data}
              tallestHeights={tallestHeights}
            />
          </div>
        ))}
      </div>
      <div className="teamname-container" style={makeGrid}>
        {data.map((chartData, index) => (
          <div className="name-chartgrid" key={index}>
            <div className="teamname-box">
              <p className="teamname">{chartData.label}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="chart-container-3"></div>
    </div>
  );
}

export default App;
