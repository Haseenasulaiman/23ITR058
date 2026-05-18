import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import AllNotifications from "./pages/AllNotifications";
import PriorityNotifications from "./pages/PriorityNotifications";

import { getAuthToken } from "./utils/auth";

function App() {

  useEffect(() => {
    getAuthToken();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AllNotifications />} />
        <Route
          path="/priority"
          element={<PriorityNotifications />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;