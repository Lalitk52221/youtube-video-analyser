import { Outlet } from "react-router-dom";
import "./App.css";

const App = () => {
  return (
    <div>
      {/* <Home /> */}
      <Outlet/>
    </div>
  );
};

export default App;
