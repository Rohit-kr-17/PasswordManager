export const Box = ({ children }: any) => {
  return (
    <div className="flex items-center justify-center w-auto h-screen">
      <div className="p-5 border flex flex-col gap-5 rounded-md shadow-xl h-[25rem] w-[20rem]">
        {children}
      </div>
    </div>
  );
};
