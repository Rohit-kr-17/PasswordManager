import {
  Accordion,
  AccordionActions,
  AccordionDetails,
  AccordionSummary,
} from "@mui/material";
import { ExpandMore } from "@mui/icons-material";
import Button from "./Button";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useState } from "react";

export const PasswordComponent = () => {
  const [toggleBorder, setToggleBorder] = useState(false);
  const [toggleVisiblity, SetToggleVisiblity] = useState(false);
  const [password, setPassword] = useState("Password");

  const handleVisiblity = () => {
    SetToggleVisiblity(!toggleVisiblity);
  };

  const handleBorder = () => {
    setToggleBorder(!toggleBorder);
  };
  onclick;
  return (
    <div className="">
      <Accordion className="w-[300px] sm:w-[720px]">
        <AccordionSummary
          expandIcon={<ExpandMore />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          Accordion 1
        </AccordionSummary>
        <AccordionDetails>
          <div
            className={`flex rounded-md h-auto w-auto z-10 ${
              toggleBorder ? "border border-black" : ""
            }`}
          >
            <input
              type={toggleVisiblity ? "text" : "password"}
              onFocus={handleBorder}
              onBlur={handleBorder}
              value={password}
              className="bg-gray-100 pl-5 h-10 flex-grow rounded-l-md z-2 outline-none"
              readOnly
            />
            <div
              onClick={handleBorder}
              className=" w-10 h-10 pr-2 rounded-r-md  flex items-center bg-gray-100"
            >
              <VisibilityIcon
                onClick={handleVisiblity}
                fontSize="small"
                className="text-sm hover:cursor-pointer"
              />
            </div>
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};
