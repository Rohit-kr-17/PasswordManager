import { NavLink, redirect, useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { authenticated, userAtom } from "../StateManagement/Atom";

export const Header = () => {
  const [auth, setAuth] = useRecoilState(authenticated);
  const user = useRecoilValue(userAtom);
  const navigate = useNavigate();
  const handleLogout = () => {
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    setAuth(false);
    navigate("/sign-in");
  };
  return (
    <div className="w-screen h-10 fixed bg-[#3D52A0] text-white md:pl-[50px] md:pr-[50px] flex items-center justify-between z-10">
      <div>
        {auth ? (
          <NavLink
            to="/passwords"
            className={({ isActive }) =>
              isActive ? "text-yellow-300 font-bold" : "text-white"
            }
          >
            Password Manager{" "}
          </NavLink>
        ) : (
          <NavLink to="/sign-in" className={" font-bold text-white"}>
            Password Manager{" "}
          </NavLink>
        )}
      </div>
      <div className="flex gap-5">
        {auth ? (
          <>
            <NavLink
              to={`/profile/${user?.id}`}
              className={({ isActive }) =>
                isActive ? "text-yellow-300 font-bold" : "text-white"
              }
            >
              Profile
            </NavLink>
            <button onClick={handleLogout} className="text-white">
              Logout
            </button>
          </>
        ) : (
          <>
            <NavLink
              to="/sign-up"
              className={({ isActive }) =>
                isActive ? "text-yellow-300 font-bold" : "text-white"
              }
            >
              Sign Up
            </NavLink>
            <NavLink
              to="/sign-in"
              className={({ isActive }) =>
                isActive ? "text-yellow-300 font-bold" : "text-white"
              }
            >
              Sign In
            </NavLink>
          </>
        )}
      </div>
    </div>
  );
};
