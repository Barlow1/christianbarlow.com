import React, { ChangeEventHandler } from "react";
import { Paragraph } from "../Typography";

const Switch = ({
  isOn,
  handleToggle,
  onColor,
  label,
}: {
  isOn: boolean;
  handleToggle: ChangeEventHandler<HTMLInputElement>;
  onColor: string;
  label?: string;
}) => {
  return (
    <div className="inline-grid">
      <Paragraph>{label}</Paragraph>
      <input
        checked={isOn}
        onChange={handleToggle}
        className="react-switch-checkbox"
        id={`react-switch-new`}
        type="checkbox"
      />
      <label
        style={{ background: isOn ? onColor : undefined }}
        className="react-switch-label m-auto"
        htmlFor={`react-switch-new`}
      >
        <span className={`react-switch-button`} />
      </label>
    </div>
  );
};

export default Switch;
