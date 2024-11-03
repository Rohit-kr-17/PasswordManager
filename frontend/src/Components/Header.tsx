import { NavLink } from "react-router-dom";
import { useRecoilState } from "recoil";
import { authenticated } from "../StateManagement/Atom";

export const Header = () => {
  const [auth, setAuth] = useRecoilState(authenticated);
  const handleLogout = () => {};
  return (
    <div className="w-screen h-10 fixed bg-[#3D52A0] text-white md:pl-[50px] md:pr-[50px] flex items-center justify-between z-10">
      <div>Password Manager</div>
      <div className="flex gap-5">
        {auth ? (
          <>
            <NavLink
              to="/profile"
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
