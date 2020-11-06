import React from "react";
import { Container, Row, Col } from "react-bootstrap";

import "./display-history.styles.scss"

function DisplayHistory({  calculationHistory }) {
 
  let  calculationHistoryStr ="";
  if( Array.isArray(calculationHistory) ){
    calculationHistoryStr = calculationHistory.map((element , index)=> {
        return (
          <Row key={`hist-${index}`}>
          <Col xs={8}>{element.algebraicExp} </Col>
          <Col xs={4}> = {element.result} </Col>
          </Row>
        );
    })
  }
  return (
    <Container
      className={`mt-2 bg-transparent border-0 shadow-sm mb-1 display-history`} 
      fluid
    > 
      {calculationHistoryStr} 
    </Container>
  );
}

export default DisplayHistory;