import React, { ChangeEventHandler } from "react";

const Switch = ({
  isOn,
  handleToggle,
}: {
  isOn: boolean;
  handleToggle: ChangeEventHandler<HTMLInputElement>;
}) => {
  const handleOnClick = (e: any) => {
    handleToggle(e);
  };

  const handleKeypress = (e: any) => {
    if (e.code === "Enter") {
      handleToggle(e);
    }
  };
  return (
    <div className="container--toggle">
      <input
        aria-label={isOn ? 'light mode on' : 'dark mode on' }
        role="switch"
        aria-checked={isOn}
        onKeyPress={handleKeypress}
        type="checkbox"
        id="toggle"
        className="toggle--checkbox"
        onClick={handleOnClick}
        checked={isOn}
        readOnly
      />
      <label htmlFor="toggle" className="toggle--label">
        <span className="toggle--label-background" />
      </label>
    </div>
  );
};

export default Switch;
