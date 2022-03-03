import React from "react";
import PropTypes from "prop-types";
import { white } from "../../style/colors";
import { X } from "react-bootstrap-icons";
import { Col, Row, Container } from "react-bootstrap";
import "../../style/SearchedIngredients.css";

const rowStyle = {
  marginLeft: "0.25em",
  backgroundColor: white,
  borderRadius: "0.5em",
};

export default function KeywordCard({ element, handleIngredientRemoval }) {
  const handleClick = (e) => {
    handleIngredientRemoval(element.i_id);
  };

  return (
    <Container className="container-style">
      <Row style={rowStyle} className="justify-content-around">
        <Col style={{marginBottom:'0.2em'}} xs={9}>{element.i_name}</Col>
        <Col xs={3}>
          <X
            onClick={(e) => {
              handleClick(e);
            }}
          />
        </Col>
      </Row>
    </Container>
  );
}

KeywordCard.propTypes = {
  element: PropTypes.object,
  handleIngredientRemoval: PropTypes.func,
};
