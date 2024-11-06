import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Header } from "./Components/Header";
import SignIn from "./Pages/SignIn";
import SignUp from "./Pages/SignUp";
import ErrorPage from "./Pages/Error";
import Passwords from "./Pages/Passwords";
import { useRecoilState, useSetRecoilState } from "recoil";
import { authenticated, userAtom } from "./StateManagement/Atom";
import { useEffect } from "react";
import axios from "axios";
import Profile from "./Pages/Profile";

function App() {
  const [auth, setAuth] = useRecoilState(authenticated);

  const setUser = useSetRecoilState(userAtom);

  useEffect(() => {
    const checkAuthenticated = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/user/isAuth",
          { withCredentials: true }
        );
        if (response.status === 200) {
          setAuth(true);
          const { email, id, name, uuid } = response.data;
          setUser({ email, name, id, uuid });
        }
      } catch (error) {
        setAuth(false);
      }
    };
    checkAuthenticated();
  }, [setAuth, setUser]);

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/passwords" element={<Passwords />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="/*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
