import React from "react";
import { Routes, Route } from "react-router-dom";
import Main from "./components/main/Main";
import Input from "./components/input/Input";
import Result from "./components/result/Result";
import MainTrans from "./components/pages/MainTrans"
import MainAns from "./components/answer/MainAns"

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Main />}></Route>
        <Route path="/Input" element={<Input />}></Route>
        <Route path="/Result-page" element={<Result />}></Route>
        <Route path="/Translation" element={<MainTrans />}></Route>
        <Route path="/answer" element={<MainAns />}></Route>
      </Routes>
    </div>
  );
};

export default App;
