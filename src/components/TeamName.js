import React, { useEffect, useState } from "react";

const TeamName = (props) => {
  const [isActive, setIsActive] = useState(false);
  const backgroundStyle = {
    backgroundColor: isActive ? "white" : "black",
    transition: "background-color 300ms ease",
  };
  const textStyle = {
    color: isActive ? "black" : "white",
    transition: "color 300ms ease",
  };

  useEffect(() => {
    let changedValue = props.data.filter((dataItem) => {
      return dataItem.y !== props.chartData.y;
    });
    for (let index = 0; index < changedValue.length; index++) {
      const element = changedValue[index];
      if (element === props.chartData) {
        setIsActive((prevState) => !prevState);
        setTimeout(() => setIsActive((prevState) => !prevState), 3000);
      }
    }
  }, [props.data]);

  return (
    <div className="teamname-box" style={backgroundStyle}>
      <p className="teamname" style={textStyle}>
        {props.chartData.label}
      </p>
    </div>
  );
};

export default TeamName;
