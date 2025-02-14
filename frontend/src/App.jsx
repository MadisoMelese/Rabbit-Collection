import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserLayout from "./components/Layout/UserLayout";
import Home from "./pages/Home";
import {Toaster} from 'sonner'
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";

const App = () => {
  return (
    <BrowserRouter>
    <Toaster position="top-right"/>
      <Routes>
        <Route path="/" element={<UserLayout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<SignUp />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
