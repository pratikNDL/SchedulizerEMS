import { ReactNode } from "react";

type ButtonType = {
  isDisabled?: boolean;
  children?: ReactNode;
  handler: () => void;
  className?: string;
};

function Button({
  isDisabled = false,
  children,
  handler,
  className,
}: ButtonType) {
  return (
    <button
      className={`border-2 p-2 disabled:cursor-not-allowed rounded-sm font-semibold ${className} `}
      disabled={isDisabled}
      onClick={handler}
    >
      {children || "Add"}
    </button>
  );
}

export default Button;
