interface ButtonProps {
  label: string;
  secondary?: boolean;
  fullWidth?: boolean;
  large?: boolean;
  onClick: () => void;
  disabled?: boolean;
  outline?: boolean;
}

const Button = ({ label, secondary, fullWidth, large, onClick, disabled, outline }: ButtonProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`
        ${fullWidth ? "w-full" : "w-auto"}
        ${large ? "py-3 text-xl" : "py-2 text-md"}
        ${secondary ? "bg-white text-black hover:bg-neutral-100" : "bg-sky-500 text-white hover:bg-sky-600"}
        ${outline ? "border border-white bg-transparent text-white hover:bg-white/10" : ""}
        ${disabled ? "cursor-not-allowed opacity-70" : "cursor-pointer"}
        rounded-full
        px-4
        font-semibold
        transition
      `}
    >
      {label}
    </button>
  );
};

export default Button;

