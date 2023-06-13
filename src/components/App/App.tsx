import type { FC } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";

import Agents from "../Agents/Agents";
import SingleAgent from "../Agents/SingleAgent";

const App: FC = () => {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Agents />} />
          <Route path="/agents/:id" element={<SingleAgent />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
