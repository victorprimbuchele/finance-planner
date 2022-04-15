import { useState } from "react";
import { Router } from "./presentation/components/Router/Router";

import "./global.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App w-full h-full">
      <Router />
    </div>
  );
}

export default App;
