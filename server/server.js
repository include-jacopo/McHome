"use strict";

const express = require("express");
const morgan = require("morgan"); //Logging middleware
const { check, param, validationResult, body } = require("express-validator"); //Validazione middleware

const dao = require("./dao"); //Modulo per l'accesso al database dei meme

//Inizializzazione di Express
const app = new express();
const port = 3001;

//Set-up del middlewares
app.use(morgan("dev"));
app.use(express.json());

//Attivazione del server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

/********************************
 * Ingredients API *
 ********************************/

//GET all the ingredients in the DB
app.get("/api/ingredients", async (req, res) => {
  try {
    const result = await dao.listIngredients();
    if (result.error) res.status(404).json(result);
    else res.json(result);
  } catch (err) {
    res.status(500).end();
  }
});

// GET all the ingredients whose names begin with :string
app.get(
  "/api/ingredients/:string",
  [param("string").isString().isLength({ min: 1 })],
  async (req, res) => {
    try {
      const result = await dao.findIngredientsByString(req.params.string);
      if (result.error) res.status(404).json(result);
      else res.json(result);
    } catch (err) {
      res.status(500).end();
    }
  }
);

/********************************
 * Recipes API *
 ********************************/

// GET all the recipes in the DB
app.get("/api/recipes", async (req, res) => {
  try {
    const result = await dao.listRecipes();
    if (result.error) res.status(404).json(result);
    else res.json(result);
  } catch (err) {
    res.status(500).end();
  }
});

// GET all the recipes whose ingredients have :ids
app.get("/api/search/ingredients=:ids", async (req, res) => {
  try {
    const filters = {
      time: req.query.time_filter,
      cost: req.query.cost_filter,
      course: req.query.course_filter,
    };
    const result = await dao.getRecipesByIngredients(
      req.params.ids.split(","),
      filters
    );
    if (result.error) res.status(404).json(result);
    else res.json(result);
  } catch (err) {
    res.status(500).end();
  }
});

// GET the recipe with :recipe_id
app.get(
  "/api/recipes/:recipe_id",
  [param("recipe_id").isInt({ min: 0 })],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    try {
      const result = await dao.getRecipeByID(req.params.recipe_id);
      if (result.error) res.status(404).json(result);
      else res.json(result);
    } catch (err) {
      res.status(500).end();
    }
  }
);

/********************************
 * Favourites API *
 ********************************/

// GET all the favourites recipes of the logged user
app.get("/api/favourites", async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  try {
    const user_id = 0; //mock user_id
    const result = await dao.getFavoritesByUserID(user_id);
    if (result.error) res.status(404).json(result);
    else res.json(result);
  } catch (err) {
    res.status(500).end();
  }
});

// POST add a recipe to the logged user favourites ones
app.post(
  "/api/favourites",
  [check("recipe_id").isInt({ min: 0 })],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    try {
      const user_id = 0; //mock user_id
      await dao.addFavourite(req.body.recipe_id, user_id);
      res.status(201).end();
    } catch (err) {
      res.status(503).json({
        error: `Database error during adding favourite recipe with id ${req.body.recipe_id}`,
      });
    }
  }
);

// DELETE remove a recipe frome the logged user favourites ones
app.delete(
  "/api/favourites/:recipe_id",
  [param("recipe_id").isInt({ min: 0 })],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    try {
      const user_id = 0; //mock user_id
      await dao.removeFavourite(req.params.recipe_id, user_id);
      res.status(201).end();
    } catch (err) {
      res.status(503).json({
        error: `Database error during removing favourite recipe with id ${req.body.recipe_id}`,
      });
    }
  }
);

/********************************
 * User API * (for testing only)
 ********************************/
app.get("/api/user", async (req, res) => {
  try {
    const result = await dao.getUserTesting();
    if (result.error) res.status(404).json(result);
    else res.json(result);
  } catch (err) {
    res.status(500).end();
  }
});
