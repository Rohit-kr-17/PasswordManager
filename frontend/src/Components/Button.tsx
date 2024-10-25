const Button = ({ tag, ...rest }: any) => {
  return (
    <button
      className="border w-full h-10 mt-5 rounded-md text-white bg-[#7091E6]"
      {...rest}
    >
      {tag}
    </button>
  );
};
export default Button;
