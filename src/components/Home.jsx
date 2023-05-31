import React from "react";
import Connect from "./Connect";
import Content from "./Content";
import Founders from "./Founders";
import RoadMap from "./RoadMap";
import CoinsChart from "./CoinsChart";
const Home = () => {
  return (
    <>
      <Content />
      <RoadMap />
      <Founders />
      <Connect />
      {/* <CoinsChart /> */}
    </>
  );
};

export default Home;
