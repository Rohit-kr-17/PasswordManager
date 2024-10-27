import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Header } from "./Components/Header";
import SignIn from "./Pages/SignIn";
import SignUp from "./Pages/SignUp";
import ErrorPage from "./Pages/Error";
import Passwords from "./Pages/Passwords";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/passwords" element={<Passwords />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
