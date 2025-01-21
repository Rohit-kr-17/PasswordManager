import { useEffect, useState } from "react";
import { Box } from "../Components/Box";
import Input from "../Components/Input";
import Button from "../Components/Button";
import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;
import { useRecoilState, useSetRecoilState } from "recoil";
import { authenticated, Loading, userAtom } from "../StateManagement/Atom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { firebaseConfig } from "../firebase";
import { FcGoogle } from "react-icons/fc";

initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
const gAuth = getAuth();
const SignIn = () => {
  const [formData, setFormData] = useState({
    Email: "",
    Password: "",
    name: "",
    googleLogin: false,
  });
  const setLoading = useSetRecoilState(Loading);
  const setUser = useSetRecoilState(userAtom);
  const [auth, setAuth] = useRecoilState(authenticated);
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(gAuth, provider);
      const email = result.user.email;
      const name = result.user.displayName;
      handleClick(email as string, name as string, "", true);
      console.log("User Info:", result.user);
    } catch (error) {
      console.error("Error during sign-in:", error);
    }
  };

  useEffect(() => {
    if (auth) {
      navigate("/passwords", { replace: true });
      return;
    }
  }, [auth, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleClick();
    }
  };

  const handleClick = async (
    Email = formData.Email,
    Name = formData.name,
    password = formData.Password,
    googleLogin = formData.googleLogin
  ) => {
    try {
      if (auth) {
        navigate("/passwords", { replace: true });
        return;
      }
      // console.log( email, name, password, googleLogin );
      setLoading(true);
      const response = await axios.post(
        apiUrl + "user/signIn",
        {
          email: Email,
          name: Name,
          password: password,
          googleLogin: googleLogin,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      setAuth(true);
      setLoading(false);
      const { email, id, name, uuid } = response.data;
      setUser({ email, name, id, uuid });
      toast.success("You are logged in.", { autoClose: 3000 });
      navigate("/passwords", { replace: true });
    } catch (err) {
      setLoading(false);
      toast.error("Invalid Credentials");
      setAuth(false);
      navigate("/sign-in");
      return;
    }
  };

  return (
    <div className="pt-[50px]">
      <Box heading="Sign In">
        <Input
          name="Email"
          label="Email"
          type="text"
          placeholder="Email"
          onChange={handleChange}
        />
        <Input
          name="Password"
          label="Password"
          type="Password"
          placeholder="Password"
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
        <Button onClick={handleClick} tag="Submit" />
        <div className="flex justify-center items-center">
          <button
            className="flex  items-center justify-center w-full border-2 p-2 rounded-md  border-[#7091E6] mt-2"
            onClick={handleGoogleSignIn}
          >
            <FcGoogle className="text-xl mr-1" /> Sign In with Google
          </button>
        </div>
      </Box>
    </div>
  );
};

export default SignIn;
