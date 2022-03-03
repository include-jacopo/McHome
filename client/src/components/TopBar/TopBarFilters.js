import React, { useState } from "react";
import { Container, Row } from "react-bootstrap";
import Filter from "./Filter";
import { lightGreen } from "../../style/colors";

export default function TopBarFilters({ handleFilters, filters }) {
  //TODO: refactor
  const [sections] = useState(["Time", "Cost", "Dish"]);

  const handleChangeInFilters = (section, element) => {
    handleFilters(sections.indexOf(section), element);
  };

  return (
    <Container style={{background: lightGreen, marginBottom:"-0.5em"}}>
      <Row style={{marginBottom:"0.4em"}}></Row>
      {sections.map((element, key) => {
        return (
          <Filter
            key={key}
            title={element}
            filter={filters[sections.indexOf(element)]}
            handleChangeInFilters={handleChangeInFilters}
          ></Filter>
        );
      })}
    </Container>
  );
}
