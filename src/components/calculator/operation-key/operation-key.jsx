import React from "react";
import { Container, Row, Col, Tooltip, OverlayTrigger } from "react-bootstrap";

import Button from "../../utilities/button/button";

const OperationKey = ({theme, onClick, mathOperationObj, ...otherProps}) => {
    //console.dir(mathOperationObj);
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
