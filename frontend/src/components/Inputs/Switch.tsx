import React from "react";

type SwitchProps = {
  isOn: boolean;
  handleToggle: () => void;
};

const Switch: React.FC<SwitchProps> = ({ isOn, handleToggle }) => {
  return (
    <div
      className={`w-12 h-6 flex items-center rounded-full cursor-pointer transition-colors ${
        isOn ? "bg-primary-green" : "bg-gray-300"
      }`}
      onClick={handleToggle}
    >
      <div
        className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform ${
          isOn ? "translate-x-6" : "translate-x-1"
        }`}
      ></div>
    </div>
  );
};

export default Switch;
