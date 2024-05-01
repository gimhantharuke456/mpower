import "./App.less";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Views/Home";
import Community from "./Views/Community";
import "antd/dist/reset.css";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/community" element={<Community />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
