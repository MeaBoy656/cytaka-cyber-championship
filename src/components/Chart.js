import React, { useEffect, useState, useRef } from "react";

const Chart = ({ chartData, tallestHeights, data }) => {
  const currentChartHeight = chartData.y;
  const [gredientArray, setGredientArray] = useState([]);
  const [textColor, setTextColor] = useState();

  const setGredient = () => {
    if (
      tallestHeights[0][0] === currentChartHeight &&
      tallestHeights[0][0] !== 0
    ) {
      setGredientArray(["#8E3426", "#FFA500", "#FFFF00"]);
      setTextColor("#FFFF00");
    } else if (tallestHeights[1][0] === currentChartHeight) {
      setGredientArray(["#281356", "#005BE7", "#00FFFF"]);
      setTextColor("#00FFFF");
    } else if (tallestHeights[2][0] === currentChartHeight) {
      setTextColor("rgb(250,150,120)");
      setGredientArray(["rgb(120,10,30)", "#FF0000", "#E03800"]);
    } else {
      setGredientArray([
        "rgba(255,255,255,0.1)",
        "rgba(255,255,255,0.1)",
        "rgba(255,255,255,0.1)",
      ]);
      setTextColor("rgba(255,255,255,0.2)");
    }
  };

  useEffect(() => {
    setGredient();
  }, [tallestHeights]);

  const chartStyle = {
    width: "auto",
    height: `${
      tallestHeights[0][0] && currentChartHeight / tallestHeights[0][0] <= 0.05
        ? "2"
        : (currentChartHeight / tallestHeights[0][0]) * 100
    }%`,
    backgroundImage: `linear-gradient(15deg, ${gredientArray[0]} 20%, ${gredientArray[1]} 78%, ${gredientArray[2]} 110%)`,
    transition: "height 3s ease-out",
  };

  return (
    <div className="chart-column">
      <p className="score" style={{ color: textColor }}>
        {chartData.y}
      </p>
      <div className="rectangle" style={{ ...chartStyle }}></div>
    </div>
  );
};

export default Chart;
