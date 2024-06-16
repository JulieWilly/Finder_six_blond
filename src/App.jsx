import { useState } from "react";
import Header from "./components/Header";
import Home from "./pages/Home/Home";
import "./App.css";

function App() {
  return (
    <>
      <Header />
      <div className="homeSection">
        <Home />
      </div>
    </>
  );
}

export default App;
