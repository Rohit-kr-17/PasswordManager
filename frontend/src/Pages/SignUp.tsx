import React, { useEffect, useState } from "react";
import { Box } from "../Components/Box";
import Button from "../Components/Button";
import Input from "../Components/Input";
import { useRecoilState, useSetRecoilState } from "recoil";
import { authenticated, userAtom } from "../StateManagement/Atom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
const apiUrl = import.meta.env.VITE_API_URL;
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { firebaseConfig } from "../firebase";
import { FcGoogle } from "react-icons/fc";

const SignUp = () => {
const navigate = useNavigate();
  initializeApp(firebaseConfig);
  const gAuth = getAuth();
  const provider = new GoogleAuthProvider();
  const [formData, setFormData] = useState({
    Username: "",
    Email: "",
    Password: "",
    googleLogin: false,
  });
  const [auth, setAuth] = useRecoilState(authenticated);
  const setUser = useSetRecoilState(userAtom);
  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(gAuth, provider);
      const email = result.user.email;
      const name = result.user.displayName;
      setFormData(() => ({
        Email: email as string,
        Password: "",
        Username: name as string,
        googleLogin: true,
      }));

      handleClick(email as string, name as string, "", true);
    } catch (error) {
      console.error("Error during sign-in:", error);
    }
  };

  useEffect(() => {
    if (auth) {
      navigate("/passwords");
    }
  }, [auth, navigate]);
  const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleClick = async (
    Email = formData.Email,
    Name = formData.Username,
    Password = formData.Password,
    googleLogin = formData.googleLogin
  ) => {
    try {
      const response = await axios.post(
        apiUrl + "user/signUp",
        {
          name: Name,
          email: Email,
          password: Password,
          googleLogin,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      const { id, email, uuid, name } = response.data;
      setUser({ id, email, uuid, name });
      toast.success("User created successfully");
      setAuth(true);
    } catch (err: any) {
      if (err.status == 409) toast.error("User already exsists");
      else if (err.status == 400)
        toast.error("Please fill in all required fields");
      else {
        toast.error("Internal server error");
      }
    }
  };
  return (
    <div className="pt-[50px]">
      <Box heading="Sign Up">
        <Input
          name="Username"
          label="Username"
          type="text"
          placeholder="Username"
          onChange={handleChange}
        />
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
export default SignUp;
