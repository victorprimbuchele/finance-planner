import { Router } from "./presentation/components/Router/Router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  faBars,
  faChartLine,
  faHome,
  faTable,
} from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";

import "./global.css";

library.add(faBars, faChartLine, faHome, faTable);

function App() {
  return (
    <div className="App w-full h-full">
      <Router />
      <ToastContainer autoClose={2000} />
    </div>
  );
}

export default App;
