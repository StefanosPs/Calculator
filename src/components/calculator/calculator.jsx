import React, { useState, useEffect } from "react";
import { Container, Row, Col, FormControl, Form } from "react-bootstrap";

import ToastWarning from "../utilities/toast/warning/toast-warning";

import {
  numbersKeysArray,
  mathOperationObj
} from "../../classes/calculator/calculatorConstants";
import {
  calculator
} from "../../classes/calculator/calculatorClass";

import ChangeTheme from "../change-theme/change-theme";
import NumberKey from "./number-key/number-key";
import OperationKey from "./operation-key/operation-key";
import DisplayHistory from "./display-history/display-history";


function Calculator({ currentTheme }) {
  let theme = currentTheme;

  theme = (theme && typeof theme === 'object')?theme:{ color: "dark", text: "text-white" } ;
  
  const [calculatorObj, setCalculatorObj] = useState({
    mathExpStr: "",
    mathCalculationHistory:"",
    toastEl: []
  });

  useEffect(() => {
    const numberKeyDown = event => {
      if (numbersKeysArray.indexOf(event.key) !== -1) {
        if (typeof event.preventDefault === "function") {
          event.preventDefault();
        }
        pushItem(event.key);
      }
      return;
    };

    const mathOperationKeyDown = event => {
      for (const property in mathOperationObj) {
        if (mathOperationObj[property].keyDown.indexOf(event.key) !== -1) {
          if (typeof event.preventDefault === "function") {
            event.preventDefault();
          }
          if (mathOperationObj[property].onClick) {
            try {
              if (
                typeof calculator[mathOperationObj[property].onClick] ===
                "function"
              ) {
                calculator[mathOperationObj[property].onClick]();
              }
              updateMathFn();
            } catch (error) {
                displayError(error);
            }
          } else {
            pushItem(property);
          }
          break;
        }
      }
      return;
    };
 
    function setKeyDown() {
      window.addEventListener("keydown", numberKeyDown);
      window.addEventListener("keydown", mathOperationKeyDown);
    }

    function unSetKeyDown() {
      numbersKeysArray.forEach(el => {
        window.removeEventListener("keydown", numberKeyDown);
        window.removeEventListener("keydown", mathOperationKeyDown);
      });
    }

    setKeyDown();
    return () => {
      unSetKeyDown();
    };
  });

  const displayError = (error) => {
    let index = calculatorObj.toastEl.length;
        setCalculatorObj({
            ...calculatorObj,
            toastEl: [
              <ToastWarning key={`key-${index}`} headerTitle={error.name}>
                {error.message}
              </ToastWarning>
            ]
        });
  }
  const pushItem = key => {
    try {
      calculator.pushItem(key);
    } catch (error) {
      console.error(error);
        return displayError(error); 
    }
    updateMathFn();
  };

  const updateMathFn = () => {
      try {
        let num =  calculator.getAlgebraicExpression();
        setCalculatorObj({
            mathExpStr: num,
            mathCalculationHistory: calculator.get_calculationHistory(),
            toastEl: []
          });
      } catch (error) {
        console.error(error);
        return displayError(error);
      }
      

  };

  return (
    <Form
      onSubmit={event => {
        event.preventDefault();
        calculator.calculate();
      }}
    >
      <Container
        className={`mt-auto pt-3 pb-3 bg-${theme.color} ${theme.text} rounded  shadow-sm`}
        style={{ maxWidth: "720px" }}
      >
        <Row>
          <Col xs={12} className="float-right mt-auto">
            <ChangeTheme />
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <DisplayHistory calculationHistory={calculatorObj.mathCalculationHistory} />
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <FormControl
              id="mathfn"
              className={`mb-2  ${theme.text} bg-transparent border-0 shadow-sm mb-1`}
              as="input"
              readOnly
              defaultValue={calculatorObj.mathExpStr}
            />
            {calculatorObj.toastEl}
          </Col>
        </Row>
        <Row>
          <Col xs={6}>
            <NumberKey
              theme={theme}
              onClick={pushItem}
              numbersKeysArray={numbersKeysArray}
            />
          </Col>
          <Col xs={6}>
            <OperationKey
            mathOperationObj={mathOperationObj} 
              theme={theme}
              onClick={(id, el) => {
                if (el.onClick) {
                  try {
                    if (typeof calculator[el.onClick] === "function") {
                        calculator[el.onClick]();
                    }
                    updateMathFn(); 
                  } catch (error) {
                    // console.error(error);
                    displayError(error);
                  }
                } else {
                  pushItem(id);
                  return;
                }
              }}
             
            />
          </Col>
        </Row>
      </Container>
    </Form>
  );
}

export default Calculator;