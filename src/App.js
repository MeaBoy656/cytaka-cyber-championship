import "./App.css";
import React, { useEffect, useRef, useState } from "react";
import Chart from "./components/Chart";
import TeamName from "./components/TeamName";

const ldata = [
  { label: "Team 301", y: 0 },
  { label: "Team 302", y: 0 },
  { label: "Team 303", y: 0 },
  { label: "Team 304", y: 0 },
  { label: "Team 305", y: 0 },
  { label: "Team 306", y: 0 },
  { label: "Team 307", y: 0 },
  { label: "Team 308", y: 0},
  { label: "Team 309", y: 0 },
  { label: "Team 310", y: 0 },
];

function App() {
  const MINUTE_MS = 10000;
  const [data, setData] = useState(ldata);
  // const prevDataRef = useRef(data);
  const [tallestHeights, setTallestHeights] = useState([[], [], []]);

  // useEffect(() => {
  //   prevDataRef.current = ldata;
  //   setData(() => {
  //     return [...prevDataRef.current];
  //   });
  // }, [ldata]);
  console.log(data);

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
  }, [data, ldata]);

  useEffect(() => {
    setInterval(() => {
      let rdata = data;
      fetch("http://52.224.2.235:8008/shares")
        .then((response) => response.json())
        .then((data) => {
          data.forEach((element) => {
            console.log("Interval is running");
            try {
              ldata=
              console.log(element);
              rdata[element.id - 1].label = element.company_id;
              rdata[element.id - 1].y = parseInt(element.score);
            } catch {
              console.log(element);
            }
          });
          setData(rdata);
        });
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
      <div className="glow">
        {data.map((chartData, index) => (
          <Chart
            key={index}
            index={index}
            chartData={chartData}
            data={data}
            tallestHeights={tallestHeights}
          />
        ))}
      </div>
      <div className="chart-container">
        {data.map((chartData, index) => (
          <div className="chartgrid" key={index}>
            <Chart
              index={index}
              chartData={chartData}
              data={data}
              tallestHeights={tallestHeights}
            />
          </div>
        ))}
      </div>
      <div className="teamname-container">
        {data.map((chartData, index) => (
          <div className="chartgrid" key={index}>
            <TeamName data={data} chartData={chartData} />
          </div>
        ))}
      </div>
      <div className="chart-container-3"></div>
    </div>
  );
}

export default App;
