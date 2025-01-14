interface InputProps {
  label: string;
  type: string;
  name: string;
  placeholder?: string;
  onChange?: any
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}
const Input = (
  { label, type, name, placeholder,...rest }: InputProps,

) => {
  return (
    <div>
      <label htmlFor={label}>{label}</label>
      <input
        name={name}
        className="w-full border rounded-sm h-auto p-2"
        type={type}
        placeholder={placeholder}
        {...rest}
      />
    </div>
  );
};

export default Input;
