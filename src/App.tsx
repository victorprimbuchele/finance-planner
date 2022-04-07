import { useState } from "react";
import { Router } from "./presentation/components/Router/Router";

import "./global.scss";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <div>
        <Router />
      </div>
    </div>
  );
}

export default App;
