import React, { useState } from "react";
import { getMap } from "../../utils";
import { Row } from "react-bootstrap";
import ButtonFilter from "./ButtonFilter";

export default function Filter({ filter, title, handleChangeInFilters }) {
  const [filterElements] = useState(getMap(title));

  const handleClick = (element) => {
    handleChangeInFilters(title, element);
  };

  return (
    <>
      <Row style={{ margin: "0 0.5em"}}>
        <p style={{ color: "white", padding: 0, marginBottom: "0.3em"}}>
          {title}
        </p>
      </Row>
      <Row
        style={{ margin: "0 0.5em 0.8em 0.5em" }}
        className="justify-content-between"
      >
        {filterElements.map((element, key) => {
          return (
            <ButtonFilter
              filter={filter}
              key={key}
              value={element}
              handleChangeInFilters={handleClick}
            ></ButtonFilter>
          );
        })}
      </Row>
      <Row></Row>
    </>
  );
}
