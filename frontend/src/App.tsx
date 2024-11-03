import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Header } from "./Components/Header";
import SignIn from "./Pages/SignIn";
import SignUp from "./Pages/SignUp";
import ErrorPage from "./Pages/Error";
import Passwords from "./Pages/Passwords";
import { useRecoilState } from "recoil";
import { authenticated } from "./StateManagement/Atom";

function App() {
  const [auth, setAuth] = useRecoilState(authenticated);
  return (
    <>
      <BrowserRouter>
        <Header />
        {auth ? (
          <>
            <Routes>
              <Route path="/passwords" element={<Passwords />} />

              <Route path="/*" element={<ErrorPage />} />
            </Routes>
          </>
        ) : (
          <>
            <Routes>
              <Route path="/sign-in" element={<SignIn />} />
              <Route path="/sign-up" element={<SignUp />} />
            </Routes>
          </>
        )}
      </BrowserRouter>
    </>
  );
}

export default App;
