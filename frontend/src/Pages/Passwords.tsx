import { PasswordComponent } from "../Components/PasswordComponent";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  authenticated,
  createPassword,
  passwordsAtom,
} from "../StateManagement/Atom";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { CreatePassword } from "../Components/CreatePassword";
import AddIcon from "@mui/icons-material/Add";
const apiUrl = import.meta.env.VITE_API_URL;

const Passwords = () => {
  const auth = useRecoilValue(authenticated);
  const [passwords, setPasswords] = useRecoilState(passwordsAtom);
  const [createPasswordVisiblity, setCreatePasswordVisiblity] =
    useRecoilState(createPassword);

  const handlePasswordCreation = () => {
    setCreatePasswordVisiblity(!createPasswordVisiblity);
  };
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth) {
      navigate("/sign-in", { replace: true });
      return;
    }
    const getPasswords = async () => {
      const response = await axios.get(apiUrl + "password", {
        withCredentials: true,
      });
      console.log(response);
      setPasswords(response.data);
      console.log(passwords);
    };
    getPasswords();
  }, [auth, navigate, createPasswordVisiblity]);

  return (
    <div className="flex w-screen pt-[50px] h-auto justify-center">
      <div className="flex flex-col items-center  p-10 gap-5 mt-5 h-auto border w-[90%] md:w-[70%]">
        <button
          className="w-[300px] md:w-[500px] h-10 rounded-md border-dashed border-gray-500 border-2 bg-gray-200"
          onClick={handlePasswordCreation}
        >
          <AddIcon className="text-gray-400 h-9 w-9" />
        </button>
        <div>{createPasswordVisiblity && <CreatePassword />}</div>
        <div>
          {passwords?.map((pass) => (
            <PasswordComponent
              key={pass.id}
              id={pass.id}
              title={pass.title}
              content={pass.content}
              createdAt={pass.createdAt}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Passwords;
