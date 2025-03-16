import { PasswordComponent } from "../Components/PasswordComponent";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  authenticated,
  createPassword,
  Loading,
  passwordsAtom,
} from "../StateManagement/Atom";
import { useNavigate } from "react-router-dom";
import {  useEffect, useState } from "react";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import AddIcon from "@mui/icons-material/Add";
import { PasswordForm } from "../Components/PasswordForm";
import { SpinnerRoundFilled } from "spinners-react";
const apiUrl = import.meta.env.VITE_API_URL;

const Passwords = () => {
  const auth = useRecoilValue(authenticated);
  const [passwords, setPasswords] = useRecoilState(passwordsAtom);
  const [loading, setLoading] = useRecoilState(Loading);
  const [search, setSearch] = useState("");
  const [skip, setSkip] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [createPasswordVisiblity, setCreatePasswordVisiblity] =
    useRecoilState(createPassword);

  const handlePasswordCreation = () => {
    setCreatePasswordVisiblity(!createPasswordVisiblity);
  };
  const navigate = useNavigate();
  const getPasswords = async () => {
    try {
      setLoading({ ...loading, fetchPassword: true });
      const response = await axios.get(apiUrl + `password?skip=${skip}`, {
        withCredentials: true,
      });
      setPasswords([...passwords, ...response.data.contents]);
      setHasMore(response.data.hasmore);
      setSkip(skip + 1);
      setLoading({ ...loading, fetchPassword: false });
    } catch (err) {
      console.log(err);
      setPasswords([]);
    }
  };

  // =================== Search ===================

  const getSearchResult = async (s: string) => {
    console.log("searching");
    const result = await axios.get(apiUrl + `password/search?search=${s.trim()}`, {
      withCredentials: true,
    });
    setPasswords(result.data);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };
  useEffect(() => {
    if (search.length > 0) {
      setHasMore(false);
      setSkip(1);
      const debounceTimer = setTimeout(() => {
        getSearchResult(search);
      }, 1000); // Wait 500ms after the last keystroke

      return () => clearTimeout(debounceTimer);
    } else {
      setPasswords([]);
      setSkip(1);
      setHasMore(true);
    }
  }, [search]);

  useEffect(() => {
    if (!auth) {
      navigate("/sign-in", { replace: true });
      return;
    }
    if (hasMore == true) getPasswords();
  }, [hasMore]);
  if (loading.fetchPassword == true && passwords.length == 0)
    return (
      <div className="flex w-screen text-8xl h-screen items-center justify-center">
        <SpinnerRoundFilled color="#7091E6" size="100px" />
      </div>
    );
  else
    return (
      <div className="flex pt-[50px] h-auto overflow-hidden  justify-center">
        <div className="flex flex-col items-center  p-10 gap-5 mt-5 h-auto border w-[90%] md:w-[70%]">
          <InfiniteScroll
          className="flex flex-col items-center "
            dataLength={passwords.length}
            next={getPasswords}
            hasMore={hasMore}
            loader={<h4>Loading...</h4>}
            endMessage={<p>No more data</p>}
          >
          <button
            className="w-[300px] md:w-[500px] h-10 rounded-md border-dashed border-gray-500 border-2 bg-gray-200"
            onClick={handlePasswordCreation}
          >
            <AddIcon className="text-gray-400 h-9 w-9" />
          </button>
          <input
            className="w-[300px] md:w-[500px] mt-5 h-10 p-2 rounded-md  border-gray-200 outline-none border-2 bg-gray-100"
            placeholder="Search"
            value={search}
            onChange={handleSearch}
          />

          <div>{createPasswordVisiblity && <PasswordForm />}</div>
          <div>
            {passwords?.map((pass) => (
              <PasswordComponent
                key={pass.id}
                id={pass.id}
                title={pass.title}
                username={pass.username}
                content={pass.content}
                file={pass.file}
                createdAt={pass.createdAt}
              />
            ))}
          </div>
          </InfiniteScroll>
        </div>
      </div>
    );
};

export default Passwords;
