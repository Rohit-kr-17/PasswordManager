import { PasswordComponent } from "../Components/PasswordComponent";
import { useRecoilState, useRecoilValue } from "recoil";
import { authenticated, passwordsAtom } from "../StateManagement/Atom";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

const Passwords = () => {
  const auth = useRecoilValue(authenticated);
  const [passwords, setPasswords] = useRecoilState(passwordsAtom);
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth) {
      navigate("/sign-in", { replace: true });
      return;
    }
    const getPasswords = async () => {
      const response = await axios.get("http://localhost:8000/api/password", {
        withCredentials: true,
      });
      console.log(response);
      setPasswords(response.data);
      console.log(passwords);
    };
    getPasswords();
  }, [auth, navigate]);

  return (
    <div className="flex w-screen pt-[50px] h-screen justify-center">
      <div className="flex justify-center p-10 gap-5 mt-5 h-auto border w-[90%] md:w-[70%]">
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
