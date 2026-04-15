interface InputProps {
  placeholder: string;
  value?: string;
  type?: string;
  disabled?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input = ({ placeholder, value, type, disabled, onChange }: InputProps) => {
  return (
    <div>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        disabled={disabled}
        onChange={onChange}
        className="w-full rounded-md border border-neutral-700 bg-black p-4 text-lg text-white outline-none transition focus:border-sky-500 disabled:cursor-not-allowed disabled:bg-neutral-900 disabled:opacity-70"
      />
    </div>
  );
};

export default Input;
