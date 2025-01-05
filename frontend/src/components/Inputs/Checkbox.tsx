import { ChangeEvent } from "react";

type CheckBoxType = {
  label: string;
  handler: (e: ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean
};
function CheckBox({ label, handler, disabled }: CheckBoxType) {
  return (
    <div className="flex items-center gap-2">
      <input
        type="checkbox"
        disabled={disabled}
        className="form-checkbox peer "
        onChange={(e) => handler(e)}
      />
      <span className="text-primary-text">{label}</span>
    </div>
  );
}

export default CheckBox;
