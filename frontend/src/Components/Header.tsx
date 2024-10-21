import { NavLink } from "react-router-dom";

export const Header = () => {
  return (
    <div className="w-screen h-10 fixed bg-[#3D52A0] text-white md:pl-[50px] md:pr-[50px] flex items-center justify-between z-10">
      <div>Password Manager</div>
      <div className="flex gap-5">
        <NavLink
          to="/sign-up" // Link to Sign Up page
          className={({ isActive }) => (isActive ? "text-yellow-300 font-bold" : "text-white")}
        >
          Sign Up
        </NavLink>
        <NavLink
          to="/sign-in" // Link to Sign In page
          className={({ isActive }) => (isActive ? "text-yellow-300 font-bold" : "text-white")}
        >
          Sign In
        </NavLink>
      </div>
    </div>
  );
};
