import { useState, useEffect } from "react";
import { Card, Row, Col, Container, Spinner } from "react-bootstrap";
import {
  EmojiFrown,
  Heart,
  HeartFill,
  ArrowLeftCircleFill,
} from "react-bootstrap-icons";
import { useHistory, useLocation } from "react-router-dom";
import API from "../API.js";
import "../style/RecipeView.css";
import { RecipeTime, RecipeCost } from "../components/RecipeRow.js";

function RecipeView(props) {
  const [recipe, setRecipe] = useState("");
  const [recipeUpdated, setRecipeUpdated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fav, setFav] = useState(false);
  const history = useHistory();

  useEffect(() => {
    setLoading(true);
    API.GET_RecipeByID(props.recipeid)
      .then((rec) => {
        setRecipe(rec);
        if (rec.favorite) {
          setFav(true);
        }
        setRecipeUpdated(false);
        setLoading(false);
      })
      .catch((r) => handleErrors(r));
  }, [recipeUpdated]);

  const handleErrors = (err) => {
    setLoading(false);
    console.log(err);
  };

  async function handleFav() {
    if (fav) {
      try {
        let res = await API.DELETE_Favourites(recipe.recipe_id);
        setFav(false);
      } catch (err) {
        console.log(err);
      }
    } else {
      try {
        let res = await API.POST_Favourites(recipe.recipe_id);
        setFav(true);
      } catch (err) {
        console.log(err);
      }
    }
  }

  function handleBack() {
    history.goBack();
  }

  return (
    <>
      {loading ? (
        <>
          {" "}
          <Row className="justify-content-center mt-5">
            <Spinner animation="border" size="xl" variant="secondary" />
          </Row>{" "}
        </>
      ) : (
        <>
          {recipe === "" ? (
            <>
              {" "}
              <NotFound />{" "}
            </>
          ) : (
            <>
              <Container>
                <Row className="justify-content-center mt-3 mb-5">
                  <RecipeCard
                    recipe={recipe}
                    fav={fav}
                    handleFav={handleFav}
                    handleBack={handleBack}
                  />
                </Row>
              </Container>
            </>
          )}
        </>
      )}
    </>
  );
}

function RecipeCard(props) {
  return (
    <Card style={{ width: "21rem", marginBottom: "2em" }}>
      <Card.Img
        variant="top"
        className="cover-recipe"
        src={props.recipe.img_path}
      />
      <ArrowLeftCircleFill className="arrow-top" onClick={props.handleBack} />
      <Card.Body>
        <Card.Title style={{ fontSize: "26px" }}>
          <Row>
            <Col>{props.recipe.recipe_name}</Col>
            <Col xs={2} sm={2}>
              {props.fav ? (
                <HeartFill
                  className="heart-recipe-fav"
                  onClick={props.handleFav}
                />
              ) : (
                <Heart className="heart-recipe" onClick={props.handleFav} />
              )}
            </Col>
          </Row>
        </Card.Title>
        <Card.Text>
          <div className="d-flex justify-content-between">
            <RecipeTime time={props.recipe.recipe_time} />
            <RecipeCost cost={props.recipe.recipe_cost} />
          </div>
          <h5 className="mb-4">Ingredients:</h5>
          {props.recipe.ingredients.map((i) => (
            <p className="ingredient" key={i.ingredient_id}>
              •{" "}
              {i.ingredient_name.charAt(0).toUpperCase() +
                i.ingredient_name.slice(1)}
              : {i.quantity}
            </p>
          ))}
        </Card.Text>
        <Card.Text>
          <h5>Instructions:</h5>
          <p style={{ whiteSpace: "pre-wrap" }}>{props.recipe.recipe_desc}</p>
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

function NotFound() {
  return (
    <Container>
      <Row style={{ marginLeft: "1em" }}>
        <h1 className="mt-5">Error 404</h1>
        <h3>Recipe not found</h3>
      </Row>
      <Row className="mt-5">
        <EmojiFrown size="80" />
      </Row>
    </Container>
  );
}

export default RecipeView;
