import { Router } from "./presentation/components/Router/Router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./global.css";

function App() {
  return (
    <div className="App w-full h-full">
      <Router />
      <ToastContainer autoClose={2000} />
    </div>
  );
}

export default App;
