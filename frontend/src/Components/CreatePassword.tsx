import { useSetRecoilState } from "recoil";
const apiUrl = import.meta.env.VITE_API_URL;
import { createPassword } from "../StateManagement/Atom";
import Input from "./Input";
import Button from "./Button";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";

export function CreatePassword() {
  const setVisiblity = useSetRecoilState(createPassword);
  const handleVisiblity = () => {
    setVisiblity(false);
  };
  const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });

  const handleClick = async () => {
   
    const newPost = await axios.post(
      apiUrl + "password/create",
      {
        title: formData.title,
        content: formData.content,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    setVisiblity(false)
    toast.success("Password added")
  };
  return (
    <div className="fixed z-10 inset-0 bg-gray-500 bg-opacity-30 backdrop-blur-sm flex items-center justify-center">
      <div className="relative p-2 bg-white rounded w-[25rem] h-[25rem] overflow-auto">
        <div className="flex ">
          <div className="items-center justify-center flex mt-5 mb-5 flex-1 text-2xl font-bold">
            Create Password
          </div>
          <button
            className="absolute mr-2 mt-0 right-0  rounded-md text-gray-400"
            onClick={handleVisiblity}
          >
            X
          </button>
        </div>
        <div className="flex flex-col gap-5">
          <Input
            label="Title"
            type="text"
            name="title"
            placeholder="Enter Title"
            onChange={handleChange}
          />
          <Input
            label="Password"
            type="text"
            name="content"
            placeholder="Enter Password"
            onChange={handleChange}
          />
          <Button tag="Save" onClick={handleClick}></Button>
        </div>
      </div>
    </div>
  );
}
