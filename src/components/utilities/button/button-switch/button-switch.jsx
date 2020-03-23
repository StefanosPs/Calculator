import React from "react";


import "./button-switch.styles.scss";

const ButtonSwitch = ({onClick , floatPosition , children, ...otherProps}) => {
    floatPosition = (floatPosition === "left" || floatPosition === "right" || floatPosition === "none")? floatPosition:'none'; 
    return (
    <div className={`switch float-${floatPosition}`}  {...otherProps}>
        <h6>{children}</h6>
        <label className="switch-label">
           <input type="checkbox" onClick={onClick}/>
           <span className="slider round"></span>        
        </label>
    </div>
    )
};

export default ButtonSwitch;