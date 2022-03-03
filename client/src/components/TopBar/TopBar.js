import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import API from "../../API";
import PropTypes from "prop-types";
import { baseGreen } from "../../style/colors";
import { Row, Container, Col } from "react-bootstrap";
import {
  ArrowLeftCircleFill,
  Funnel,
  CaretDown,
  CaretUp,
} from "react-bootstrap-icons";
import { mapToIndex } from "../../utils";
import AddInput from "./AddInput";
import KeywordCard from "./KeywordCard";
import TopBarFilters from "./TopBarFilters";

const containerStyle = {
  padding: "0.25em 0",
  backgroundColor: baseGreen,
};
const rowsStyle = {
  margin: "0.5em 0",
};

const parseIngredientsIds = (ingredients) => {
  return ingredients.map((element) => {
    return element.i_id;
  });
};

export default function TopBar({
  handleRefresh,
  handleRefreshOne,
  ingredients,
  handleIngredients,
  filters,
  handleFilters,
}) {
  const history = useHistory();
  const [openFilters, setOpenFilters] = useState(false);

  useEffect(() => {
    if (ingredients.length === 0) {
      history.push("/");
    }
    let time = mapToIndex("Time", filters[0]);
    let cost = mapToIndex("Cost", filters[1]);
    let dish = mapToIndex("Dish", filters[2]);
    let recipesWithOne = [];
    let filteredRecipes = [];

    API.GET_RecipeByIngredients(
      parseIngredientsIds(ingredients),
      time === "-1" ? false : time,
      cost === "-1" ? false : cost,
      dish === "-1" ? false : dish
    )
      .then((data) => {
        handleRefresh(data);
        filteredRecipes.push(data);

        if (ingredients.length > 1) {
          API.GET_RecipeByIngredients(
            parseIngredientsIds([ingredients[0]]), false, false, false
          )
            .then((data) => {
              data.map((rec) => {
                  if (filteredRecipes[0].filter(r => r.recipe_id === rec.recipe_id).length <= 0) {
                    recipesWithOne.push(rec);
                  } 
              }) 
              handleRefreshOne(recipesWithOne);
            })
            .catch((err) => console.log(err));
        } else handleRefreshOne([]);

      })
      .catch((err) => console.log(err));
  }, [ingredients, filters]);

  const goBack = () => {
    history.push("/");
  };
  const handleInputChange = (value) => {
    let repeated = ingredients.filter((el) => el.i_id === value.i_id);
    if (repeated.length < 1) handleIngredients((items) => [...items, value]);
  };

  const handleIngredientRemoval = (value) => {
    const newIngredients = ingredients.filter((e) => e.i_id !== value);
    handleIngredients(newIngredients);
  };

  const handleOpenFilters = (e) => {
    setOpenFilters(!openFilters);
  };

  const handleFiltersAux = (index, value) => {
    let copyFilters = [...filters];
    if (copyFilters[index] !== value) copyFilters[index] = value;
    else copyFilters[index] = undefined;
    handleFilters(copyFilters);
  };

  return (
    <div>
      <Container fluid style={containerStyle}>
        <Row style={rowsStyle}>
          <Col xs={2}>
            <ArrowLeftCircleFill
              style={{ marginLeft: "0.2em" }}
              onClick={goBack}
              color={"white"}
              size="34"
            ></ArrowLeftCircleFill>
          </Col>
          <Col xs={10}>
            <AddInput handleInputChange={handleInputChange}></AddInput>
          </Col>
        </Row>
        <Row style={rowsStyle}>
          <Col xs={2} />
          <Col xs={10}>
            <Row className="justify-content-start">
              {ingredients.map((element, i) => (
                <KeywordCard
                  handleIngredientRemoval={handleIngredientRemoval}
                  key={i}
                  element={element}
                ></KeywordCard>
              ))}
            </Row>
          </Col>
        </Row>
        <Row style={rowsStyle} className="justify-content-end">
          <Col style={{ color: "white" }} className="text-end">
            <span
              style={{ marginRight: "0.4em" }}
              onClick={(e) => handleOpenFilters(e)}
            >
              <Funnel size={18} /> Filters
              {openFilters ? (
                <CaretUp size={20} style={{ marginLeft: "0.4em" }} />
              ) : (
                <CaretDown size={20} style={{ marginLeft: "0.4em" }} />
              )}
            </span>
          </Col>
        </Row>
        {openFilters ? (
          <TopBarFilters filters={filters} handleFilters={handleFiltersAux} />
        ) : (
          ""
        )}
      </Container>
    </div>
  );
}

TopBar.propTypes = {
  search: PropTypes.object,
};
