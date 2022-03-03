import { Card, Row, Col } from "react-bootstrap";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { Heart, HeartFill, ClockHistory } from "react-bootstrap-icons";
import API from "../API.js";
import "../style/RecipeRow.css";

function RecipeRow(props) {
  const [fav, setFav] = useState(props.recipe.favorite);

  const history = useHistory();

  function handleClick() {
    var string = "/recipe/" + props.recipe.recipe_id;

    if (props.filters !== undefined && props.ingredients !== undefined) {
      history.replace("/search", {
        params: {
          filters: props.filters,
          ingredients: props.ingredients,
        },
      });
    }

    history.push(string);
  }

  async function handleFav() {
    if (fav) {
      try {
        let res = await API.DELETE_Favourites(props.recipe.recipe_id);
        setFav(false);
      } catch (err) {
        console.log(err);
      }
    } else {
      try {
        let res = await API.POST_Favourites(props.recipe.recipe_id);
        setFav(true);
      } catch (err) {
        console.log(err);
      }
    }
  }

  return (
    <Card style={{ width: "21rem" }}>
      <Card.Img
        onClick={handleClick}
        variant="top"
        className="cover-row"
        src={props.recipe.img_path}
      />
      <Card.Body>
        <Row>
          <Col>
            <Card.Title onClick={handleClick} style={{ cursor: "pointer" }}>
              {props.recipe.recipe_name}
            </Card.Title>
          </Col>
          <Col xs={2} sm={2}>
            {fav ? (
              <HeartFill className="heart-fill" onClick={handleFav} />
            ) : (
              <Heart className="heart" onClick={handleFav} />
            )}
          </Col>
        </Row>
        <Card.Text>
          <div
            className="d-flex justify-content-between"
            style={{ marginBottom: "-15px" }}
          >
            <RecipeTime time={props.recipe.recipe_time} />
            <RecipeCost cost={props.recipe.recipe_cost} />
          </div>
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

function RecipeTime(props) {
  return (
    <>
      {props.time === 2 ? (
        <p className="font-desc">
          25+ min <ClockHistory className="clock" />
        </p>
      ) : (
        ""
      )}
      {props.time === 1 ? (
        <p className="font-desc">
          10-25 min <ClockHistory className="clock" />
        </p>
      ) : (
        ""
      )}
      {props.time === 0 ? (
        <p className="font-desc">
          5-10 min <ClockHistory className="clock" />
        </p>
      ) : (
        ""
      )}
    </>
  );
}

function RecipeCost(props) {
  return (
    <>
      {props.cost === 2 ? <p className="font-desc">€€€</p> : ""}
      {props.cost === 1 ? <p className="font-desc">€€</p> : ""}
      {props.cost === 0 ? <p className="font-desc">€</p> : ""}
    </>
  );
}

export { RecipeRow, RecipeTime, RecipeCost };
