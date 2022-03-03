import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Row, Container } from "react-bootstrap";
import Grocery from "../components/Grocery.js";
import IngredientSearch from "../components/IngredientSearch.js";
import "../style/Homescreen.css";

function Homescreen(props) {
  const history = useHistory();
  const [selectedIngr, setSelectedIngr] = useState([]);
  const [enterFlag, setEnterFlag] = useState(false);
  const [imageFlag, setImageFlag] = useState(true);

  const handlePageChange = (e) => {
    if (e.key === "Enter") {
      setEnterFlag(true);
    }
  };

  const handleKeyboardUp = (e) => {
    setImageFlag(false);
  };

  const handleKeyboardDown = (e) => {
    setImageFlag(true);
  };

  useEffect(() => {
    if (selectedIngr.length > 0 || (enterFlag && selectedIngr.length > 0)) {
      history.push("/search", {
        params: { ingredients: [selectedIngr[0]], filters: [] },
      });
    }
  }, [selectedIngr, enterFlag]);

  return (
    <Container onKeyDown={handlePageChange}>
      <Row className="title-positioning">
        <h1 className="title-size">McHome</h1>
        <h2 className="subtitle-size">as easy as your mom cooked for you</h2>
      </Row>
      <Row>
        {imageFlag ? (
          <Grocery />
        ) : (
          <>
            <Row className="mt-4"></Row>
          </>
        )}
      </Row>
      <Row>
        <IngredientSearch
          handleKeyboardUp={handleKeyboardUp}
          handleKeyboardDown={handleKeyboardDown}
          ingrList={props.ingrList}
          selectedIngr={selectedIngr}
          setSelectedIngr={setSelectedIngr}
        />
      </Row>
    </Container>
  );
}

export default Homescreen;
