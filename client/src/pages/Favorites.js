import { useState, useEffect } from "react";
import { Row, Container, Spinner } from "react-bootstrap";
import { HeartFill } from "react-bootstrap-icons";
import API from "../API.js";
import { RecipeRow } from "../components/RecipeRow.js";

function Favorites(props) {
  const [recipeList, setRecipeList] = useState([]);
  const [recipeListUpdated, setRecipeListUpdated] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    API.GET_FavouritesByUserID()
      .then((rec) => {
        setRecipeList(rec);
        setRecipeListUpdated(false);
        setLoading(false);
      })
      .catch((r) => handleErrors(r));
  }, [recipeListUpdated]);

  const handleErrors = (err) => {
    console.log(err);
  };

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
          <Container>
            <Row className="mt-3">
              <h1 style={{ fontSize: "30px", marginLeft: "0.5em" }}>
                Your favorite recipes
              </h1>
            </Row>
            <Row
              className="justify-content-center"
              style={{ marginBottom: "5em" }}>
              {recipeList.length > 0 ? (
                recipeList
                  .slice(0)
                  .reverse()
                  .map((r) => (
                    <>
                      <Row className="justify-content-center mt-3">
                        <RecipeRow key={r.recipe_id} recipe={r} />
                      </Row>
                    </>
                  ))
              ) : (
                <NoFavorites />
              )}
            </Row>
          </Container>
        </>
      )}
    </>
  );
}

function NoFavorites() {
  return (
    <Container>
      <Row className="mt-4">
        <h4 style={{ fontSize: "18px", marginLeft: "1em" }}>
          No recipes found.
        </h4>
        <h4 style={{ fontSize: "18px", marginLeft: "1em" }}>
          Find a recipe you like and click the <br /> heart icon to add it to
          your favorites!
        </h4>
        <HeartFill className="mt-4" size="40" style={{ color: "red" }} />
      </Row>
    </Container>
  );
}

export default Favorites;
