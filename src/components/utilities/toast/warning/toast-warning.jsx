import React from "react";

import Toast from "../toast";

const ToastWarning = ({ children, headerTitle, ...otherProps }) => {
  return (
    <div
      className={`toast-warning`}
      style={{
        position: "absolute",
        top: 0,
        right: 0
      }}
    >
      <Toast headerTitle={headerTitle} {...otherProps}>
        {children}
      </Toast>
    </div>
  );
};

export default ToastWarning;
