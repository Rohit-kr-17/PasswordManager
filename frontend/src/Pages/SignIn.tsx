import { useEffect, useState } from "react";
import { Box } from "../Components/Box";
import Input from "../Components/Input";
import Button from "../Components/Button";
import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;
import { useRecoilState, useSetRecoilState } from "recoil";
import { authenticated, Loading, userAtom } from "../StateManagement/Atom";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const [formData, setFormData] = useState({
    Email: "",
    Password: "",
  });
  const [loading, setLoading] = useRecoilState(Loading);
  const setUser = useSetRecoilState(userAtom);
  const [auth, setAuth] = useRecoilState(authenticated);
  const navigate = useNavigate();
  useEffect(() => {
    console.log("hello", auth);
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

  const handleClick = async () => {
    try {
      if (auth) {
        navigate("/passwords", { replace: true });
        return;
      }
      setLoading(true);
      const response = await axios.post(
        apiUrl + "user/signIn",
        {
          email: formData.Email,
          password: formData.Password,
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
      navigate("/passwords", { replace: true });
    } catch (err) {
      setLoading(false);
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
        />
        <Button onClick={handleClick} tag="Submit" />
      </Box>
    </div>
  );
};

export default SignIn;
