import {BrowserRouter,  Route, Routes } from "react-router-dom";
import UserLayout from "./components/Layout/UserLayout";

const App = () => {
  return(
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<UserLayout />} />
    </Routes>
  </BrowserRouter>
  ) 
};

export default App;
