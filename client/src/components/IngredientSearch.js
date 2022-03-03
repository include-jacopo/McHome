import { Form } from "react-bootstrap";
import { Typeahead } from "react-bootstrap-typeahead";
import "../style/Homescreen.css";

function IngredientSearch(props) {
  const filterByFields = ["i_name"];
  return (
    <>
      <Form.Group>
        <Typeahead
          onFocus={() => props.handleKeyboardUp()}
          onBlur={() => props.handleKeyboardDown()}
          size={"large"}
          filterBy={filterByFields}
          id="basic-typeahead-single"
          labelKey={(option) => `${option.i_name}`}
          onChange={props.setSelectedIngr}
          options={props.ingrList}
          placeholder=" 🔍  Search for an ingredient..."
          selected={props.selectedIngr}
          minLength={1}
          maxResults={3}
          inputProps={{
            style: {
              borderRadius: "1.5rem",
              marginLeft: "1rem",
              marginRight: "1rem",
              fontSize: "20px",
            },
          }}
          renderMenuItemChildren={(option) => <div>{option.i_name}</div>}
        />
      </Form.Group>
    </>
  );
}

export default IngredientSearch;
