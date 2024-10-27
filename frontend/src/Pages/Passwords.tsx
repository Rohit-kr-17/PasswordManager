import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import { PasswordComponent } from "../Components/PasswordComponent";

const Passwords = () => {
  return (
    <div className="flex w-screen pt-[50px] h-screen justify-center">
      <div className="flex justify-center p-10 gap-5 mt-5 h-auto border w-[90%] md:w-[70%]">
        <div>
          <PasswordComponent />     
        </div>
      </div>
    </div>
  );
};

export default Passwords;
