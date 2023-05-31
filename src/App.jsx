import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import NavBar  from "./components/Navbar";
import Home from "./components/Home";
import Staking from "./components/Staking";
import RoadMap from "./components/RoadMap";
import Founders from "./components/Founders";
import CoinsChart from "./components/CoinsChart";
function App() {
  return (
    <Router>
      <div>
          <NavBar />
        <div>
        </div>
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/roadmap" exact element={<RoadMap />} />
          <Route path="/founders" exact element={<Founders />} />
          <Route path="/staking" element={<Staking />} />
          <Route path="/chart" element={<CoinsChart />} />

        </Routes>
      </div>
    </Router>
  );
}
export default App;
