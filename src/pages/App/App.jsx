import { Routes, Route } from "react-router-dom";
import "./App.css";
import HomePage from "../HomePage/HomePage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
    </Routes>
  );
}
