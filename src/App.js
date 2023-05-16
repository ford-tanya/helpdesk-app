import React from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from './Navbar'
import DataGrids from "./DataGrids";

export default function App() {
  return (
      <div>
        <Navbar />
        <Routes>
          <Route path='/' element={<DataGrids />} />
        </Routes>
      </div>
  );
}