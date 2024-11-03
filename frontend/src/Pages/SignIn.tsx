import { useState } from "react";
import { Box } from "../Components/Box";
import Input from "../Components/Input";
import Button from "../Components/Button";
import axios from "axios";
import { Password } from "@mui/icons-material";
import { useRecoilState } from "recoil";
import { authenticated } from "../StateManagement/Atom";

const SignIn = () => {
  const [formData, setFormData] = useState({
    Email: "",
    Password: "",
  });
  const [auth,setAuth] = useRecoilState(authenticated)
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleClick = async () => {
    const response= await axios.post(
      "http://localhost:8000/api/user/signIn",
      {
        email: formData.Email,
        password: formData.Password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true
      },
    
    );
    if(response.status==200){
      setAuth(true)
    }else{
      setAuth(false)

    }
    console.log(response);

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
        />
        <Button onClick={handleClick} tag="Submit" />
      </Box>
    </div>
  );
};

export default SignIn;
