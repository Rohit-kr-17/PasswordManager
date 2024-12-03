import React, { useEffect, useState } from "react";
import { Box } from "../Components/Box";
import Button from "../Components/Button";
import Input from "../Components/Input";
import { useRecoilState, useSetRecoilState } from "recoil";
import { authenticated, userAtom } from "../StateManagement/Atom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    Username: "",
    Email: "",
    Password: "",
  });
  const [auth, setAuth] = useRecoilState(authenticated);
  const setUser = useSetRecoilState(userAtom);

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
  const handleClick = async () => {
    try {
      const { Username, Email, Password } = formData;
      const response = await axios.post(
        apiUrl + "user/signUp",
        {
          name: Username,
          email: Email,
          password: Password,
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
      setAuth(true);
    } catch (err: any) {
      if (err.status == 400) console.log("User already exisits");
      else {
        console.log("Internal server error");
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
      </Box>
    </div>
  );
};
export default SignUp;
