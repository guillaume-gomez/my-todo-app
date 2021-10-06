import React, { ReactElement } from "react";

interface ButtonProps {
  label: string;
  onClick: () => void;
}

function Button({label, onClick} : ButtonProps ): ReactElement {
  return <button onClick={onClick}>{label}</button>
}

export default Button;
