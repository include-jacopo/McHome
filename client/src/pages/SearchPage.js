import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import TopBar from "../components/TopBar/TopBar";
import { RecipeRow } from "../components/RecipeRow";
import { Container, Row } from "react-bootstrap";

export default function SearchPage() {
  const location = useLocation();
  const state =
    location.state === undefined
      ? { ingredients: [{ i_name: "", i_id: -1 }], filters: [] }
      : location.state.params;
  const [recipes, setRecipes] = useState([]);
  const [recipesOne, setRecipesOne] = useState([]);

  const [ingredients, setIngredient] = useState(state.ingredients);
  const [filters, setFilters] = useState(state.filters);

  const handleRefresh = (data) => {
    setRecipes(data);
  };
  const handleRefreshOne = (data) => {
    setRecipesOne(data);
  };

  const handleFilters = (data) => {
    setFilters(data);
  };

  const handleIngredients = (data) => {
    setIngredient(data);
  };

  return (
    <>
      <TopBar
        handleRefresh={handleRefresh}
        handleRefreshOne={handleRefreshOne}
        filters={filters}
        ingredients={ingredients}
        handleFilters={handleFilters}
        handleIngredients={handleIngredients}
      ></TopBar>
      <Container style={{ marginBottom: "5em" }} className="mt-4">
        {recipes.length < 1 ? (
          <>
            <h4
              style={{
                textAlign: "center",
                fontSize: "18px",
                marginTop: "2em",
              }}
            >
              {" "}
              No recipes found with your research.{" "}
            </h4>
            <h4 style={{ textAlign: "center", fontSize: "18px" }}>
              {" "}
              Try to change your search fields!
            </h4>
          </>
        ) : (
          ""
        )}
        {recipes.map((element) => {
          return (
            <Row className="justify-content-center mb-3">
              <RecipeRow
                filters={filters}
                ingredients={ingredients}
                key={element.i_id}
                recipe={element}
              ></RecipeRow>
            </Row>
          );
        })}
        {recipesOne.length > 0 ? (
          <h4
            style={{
              textAlign: "left",
              marginTop: "1.4em",
              marginBottom: "0.6em",
              marginLeft: "0.9em",
            }}
          >
            {" "}
            All other recipes with: {ingredients[0].i_name}{" "}
          </h4>
        ) : (
          ""
        )}
        {recipesOne.map((element) => {
          return (
            <Row className="justify-content-center mb-3">
              <RecipeRow
                filters={filters}
                ingredients={ingredients}
                key={element.i_id}
                recipe={element}
              ></RecipeRow>
            </Row>
          );
        })}
      </Container>
    </>
  );
}
