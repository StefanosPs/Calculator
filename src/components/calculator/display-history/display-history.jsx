import React from "react";
import { Container, Row, Col } from "react-bootstrap";

function DisplayHistory({ theme,calculationHistory }) {
  theme =
    theme && typeof theme === "object"
      ? theme
      : { color: "dark", text: "text-white" };

  let  calculationHistoryStr ="";
  if( Array.isArray(calculationHistory) ){
    calculationHistoryStr = calculationHistory.map((element , index)=> {
        return (
          <Row key={`hist-${index}`}>
          <Col xs={9}>{element.algebraicExp} </Col>
          <Col xs={3}> = {element.result} </Col>
          </Row>
        );
    })
  }
  return (
    <Container
      className={`mt-2 ${theme.text} bg-transparent border-0 shadow-sm mb-1`}
      style={{minHeight:100}}
    > 
      {calculationHistoryStr} 
    </Container>
  );
}

export default DisplayHistory;