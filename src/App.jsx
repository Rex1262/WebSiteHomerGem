import Connect from "./components/Connect";
import Content from "./components/Content";
import Founders from "./components/Founders";
import NavBar from "./components/Navbar";
import RoadMap from "./components/RoadMap";

function App() {
  return (
    <>
      <div>
        <NavBar />
        <Content />
        <RoadMap />
        <Founders />
        <Connect />
      </div>
    </>
  );
}
export default App;
