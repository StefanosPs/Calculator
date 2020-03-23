import React, { useState } from "react";
import { Toast as Toast00 } from "react-bootstrap";

const Toast = ({ children,  headerTitle, className, ...otherProps }) => { 
  const [show, setShow] = useState(true);
  let retHeader;

  if (headerTitle) {
    /* <img src="holder.js/20x20?text=%20" className="rounded mr-2" alt="" /> */
    retHeader = ( 
      <Toast00.Header className={className}> 
        <strong className="mr-auto">{headerTitle}</strong>
      </Toast00.Header>
    );
  }
  
  return ( 
        <Toast00   onClose={() => setShow(false)}  show={show} delay={3000}   autohide >
          {retHeader}
          <Toast00.Body className={className} >{children}</Toast00.Body>
        </Toast00> 
  );
};
// <Toast00 {...otherProps}>{children}</Toast00>
export default Toast;
