import React, { useState } from "react";
import { Box } from "../Components/Box";
import Button from "../Components/Button";
import Input from "../Components/Input";

const SignUp = () => {
  const [formData, setFormData] = useState({
    Username: "",
    Email: "",
    Password: "",
  });
  const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));  
  };
  const handleClick = () => {
    console.log(formData);
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
