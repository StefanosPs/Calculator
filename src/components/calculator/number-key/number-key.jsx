import React from "react";
import {
    Container,
    Row,
    Col
  } from "react-bootstrap";

import Button from "../../utilities/button/button";
 




function NumberKey({theme, onClick, numbersKeysArray, ...otherProps }){

    const numStr = numbersKeysArray.map((variable, index) => {
        let button;
        if (variable || variable === 0) {
          button = (
            <Button
              onClick={() => {
                onClick(variable); 
              }}
              variant={`outline-${theme.color}`}
              className={`shadow mb-1 pl-3 pr-3 ${theme.text}  rounded`}
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

export default NumberKey;