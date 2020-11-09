import React from "react";
import {
    Container,
    Row,
    Col,
    Alert
  } from "react-bootstrap";

import Button from "../../utilities/button/button";
 




function NumberKey({theme, onClick, numbersKeysArray, ...otherProps }){

  theme = (theme && typeof theme === 'object')?theme:{ color: "dark", text: "text-white" } ;
  if(typeof onClick !== 'function'){
    onClick = (arg)=>{console.log(arg)}
  }
  if(!(Array.isArray(numbersKeysArray))){
    return (
      <Container {...otherProps}>
            <Row className="justify-content-center">
            <Col><Alert variant="danger">
            Prop numbersKeysArray must be an array
          </Alert></Col>
            </Row>
      </Container>
    );
  }

    const numStr = numbersKeysArray.map((variable, index) => {
        let button;
        if (variable || variable === 0) {
          const id = (Number.isInteger(Number(variable)))? `number-key-${variable}` : `numID-${index}`
          button = (
            <Button
              onClick={() => {
                onClick(variable); 
              }}
              variant={`outline-${theme.color}`}
              className={`shadow mb-1 pl-3 pr-3 ${theme.text}  rounded`}
              id={id} 
            >
              {variable}
            </Button>
          );
        }
        return (
          <Col key={`numID-${index}`} xs={4} style={{ textAlign: "center" }}>
            {button}
          </Col>
        );
      });

    return (
        <Container {...otherProps}>
              <Row className="justify-content-center">{numStr}</Row>
        </Container>
    );
}

NumberKey.defaultProps = {
  theme: 'light'
};
export default NumberKey;