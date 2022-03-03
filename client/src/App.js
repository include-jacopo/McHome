import API from './API.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Homescreen from './pages/Homescreen.js';
import Favorites from './pages/Favorites.js';
import SearchPage from './pages/SearchPage.js';
import McNavbar from './components/McNavbar.js';
import RecipeView from './pages/RecipeView.js';
import Profile from './pages/Profile';

function App() {
  const [ingrList, setIngrList] = useState([]);
  const [ingrListUpdated, setIngrListUpdated] = useState(true);

  useEffect(() => {
    API.GET_Ingredients()
      .then((ingr) => {
        setIngrList(ingr);
        setIngrListUpdated(false);
      })
      .catch((i) => handleErrors(i));
  }, [ingrListUpdated]);

  //Gestione di eventuali errori in risposta alle API
  const handleErrors = (err) => {
    console.log(err);
  };

  return (
    <Router>
      {/* <Toast
        show={message !== ""}
        onClose={() => setMessage("")}
        delay={3000}
        autohide
      >
        <Toast.Body>{message?.msg}</Toast.Body>
      </Toast> */}

      <McNavbar />

      <Switch>
        <Route exact path="/">
          <Homescreen ingrList={ingrList} />
        </Route>

        <Route exact path="/search">
          <SearchPage />
        </Route>

        <Route exact path="/favorites">
          <Favorites />
        </Route>

        <Route exact path="/recipe/:recipeid" render={({ match }) => (
          <RecipeView recipeid={match.params.recipeid} />)} />

        <Route exact path="/profile">
          <Profile/>
        </Route>

      </Switch>
    </Router>
  );
}

export default App;
