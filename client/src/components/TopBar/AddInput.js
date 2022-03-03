import React, { useEffect, useState } from "react";
import API from "../../API";
import { Typeahead } from "react-bootstrap-typeahead";

function AddInput({ handleInputChange }) {
  const [inputIngredient] = useState([]);
  const [ingredientList, setIngredientList] = useState([]);

  useEffect(() => {
    API.GET_Ingredients()
      .then((data) => {
        setIngredientList(data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleOnChange = (e) => {
    handleInputChange(e[0]);
  };

  return (
    <Typeahead
      style={{marginRight:'0.3em'}}
      id="add-ingredients"
      labelKey={(option) => `${option.i_name}`}
      onChange={(e) => handleOnChange(e)}
      options={ingredientList}
      placeholder={"Add a new ingredient to the search..."}
      selected={inputIngredient}
      maxResults={4}
      inputProps={{
        style: { borderRadius: "0.8em" },
      }}
      renderMenuItemChildren={(option) => <div>{option.i_name}</div>}
    />
  );
}

export default AddInput;
