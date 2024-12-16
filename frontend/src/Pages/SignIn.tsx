import { useEffect, useState } from "react";
import { Box } from "../Components/Box";
import Input from "../Components/Input";
import Button from "../Components/Button";
import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { authenticated, Loading, userAtom } from "../StateManagement/Atom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const SignIn = () => {
  const [formData, setFormData] = useState({
    Email: "",
    Password: "",
  });
  const setLoading = useSetRecoilState(Loading);
  const setUser = useSetRecoilState(userAtom);
  const [auth, setAuth] = useRecoilState(authenticated);
  const navigate = useNavigate();
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
      toast.success("You are logged in.", { autoClose: 3000 });
      navigate("/passwords", { replace: true });
    } catch (err) {
      setLoading(false);
      toast.error("Invalid Credentials")
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
