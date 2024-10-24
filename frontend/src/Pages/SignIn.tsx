import { useState } from "react";
import { Box } from "../Components/Box";
import Input from "../Components/Input";

const SignIn = () => {
  const [formData, setFormData] = useState({
    Username: "",
    Email: "",
    Password: "",
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value, // Update the specific input field
    }));
  };
  return (
    <div className="pt-[50px]">
      <Box>
        <Input
          name="Username"
          label="Username"
          type="text"
          placeholder="Username"
          onChange={handleChange}
        />
        <Input name="Email" label="Email" type="text" placeholder="Email" />
        <Input
          name="Password"
          label="Password"
          type="Password"
          placeholder="Password"
        />
      </Box>
    </div>
  );
};

export default SignIn;
