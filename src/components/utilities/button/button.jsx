import React from "react";
import { Button as Button00 } from "react-bootstrap";


const Button = ({ children, ...otherProps }) => { 
  return (
    <Button00 {...otherProps}>{children}</Button00> 
  )
};

export default Button;
