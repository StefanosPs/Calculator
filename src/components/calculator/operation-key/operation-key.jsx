import React from "react";
import { Container, Row, Col, Tooltip, OverlayTrigger, Alert } from "react-bootstrap";

import Button from "../../utilities/button/button";

const OperationKey = ({theme, onClick, mathOperationObj, ...otherProps}) => {
    //console.dir(mathOperationObj);
  theme = (theme && typeof theme === 'object')?theme:{ color: "dark", text: "text-white" } ;
  if(typeof onClick !== 'function'){
    onClick = (arg0, arg1 )=>{console.log(arg0, arg1 )}
  }
  if( typeof mathOperationObj !== 'object' ){ 
    return (
      <Container {...otherProps}>
            <Row className="justify-content-center">
            <Col><Alert variant="danger">
            Prop mathOperationObj must be an object
          </Alert></Col>
            </Row>
      </Container>
    );
  }
  
  const actionsStr = Object.keys(mathOperationObj).map(id => {
    let columnSize = 4;
    let el = mathOperationObj[id];
    if (id === "result") {
      columnSize = 8;
    }

    return (
      <Col key={`actID-${id}`} xs={columnSize} style={{ textAlign: "center" }}>
        <OverlayTrigger
          key={id}
          placement="top"
          overlay={<Tooltip id={`tooltip-${id}`}>{el.desc}</Tooltip>}
        >
          <Button
            id={`operation-key-${id}`}
            onClick={() => onClick(id, el)}
            variant={el.variant}
            className={`shadow pl-3 pr-3 ${theme.text} mb-1 rounded`}
            text={el.desc}
            block
          >
            {el.title}
          </Button>
        </OverlayTrigger>
      </Col>
    );
  });

  return (
    <Container {...otherProps}>
      <Row>{actionsStr}</Row>
    </Container>
  );
};
export default OperationKey;
