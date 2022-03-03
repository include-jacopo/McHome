import { Ingredient } from "./models/ingredients.js";
import { Recipe } from "./models/recipes.js";
import { User } from "./models/user.js";

//GET of all the ingredients
async function GET_Ingredients() {
  let data = [];
  try {
    const res = await fetch("/api/ingredients", { method: "GET" });
    if (!res.ok) {
      throw new Error(res.statusText);
    }
    data = await res.json();
  } catch (e) {
    throw new Error(e);
  }
  return data.map((i) => new Ingredient(...Object.values(i)));
}

//GET of all the recipes
async function GET_FavouritesByUserID() {
  let data = [];
  try {
    const res = await fetch("/api/favourites", { method: "GET" });
    if (!res.ok) {
      throw new Error(res.statusText);
    }
    data = await res.json();
  } catch (e) {
    throw new Error(e);
  }
  return data.map((r) => new Recipe(...Object.values(r)));
}

//GET a recipe by its ID
async function GET_RecipeByID(recipe_id) {
  let recipe;
  try {
    const res = await fetch("/api/recipes/" + recipe_id, { method: "GET" });
    if (!res.ok) {
      throw new Error(res.statusText);
    }
    recipe = await res.json();
  } catch (e) {
    throw new Error(e);
  }
  return new Recipe(...Object.values(recipe));
}

//GET a recipe by its ID
async function GET_RecipeByIngredients(ingredient_ids, time, cost, course) {
  let recipes = [];
  try {
    let url = "/api/search/ingredients=" + ingredient_ids.join(",");
    if (time || course || cost) {
      url += "?";
      if (time) {
        url += "time_filter=" + time + "&";
      }
      if (cost) {
        url += "cost_filter=" + cost + "&";
      }
      if (course) {
        url += "course_filter=" + course + "&";
      }
    }
    const res = await fetch(url, { method: "GET" });
    if (!res.ok) {
      throw new Error(res.statusText);
    }
    recipes = await res.json();
  } catch (e) {
    throw new Error(e);
  }
  return recipes.map((r) => new Recipe(...Object.values(r)));
}

async function POST_Favourites(recipe_id) {
  try {
    const res = await fetch("/api/favourites", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        recipe_id: recipe_id,
      }),
    });
    if (!res.ok) {
      throw new Error(res.statusText);
    } else {
      return;
    }
  } catch (e) {
    throw new Error(e);
  }
}

async function DELETE_Favourites(recipe_id) {
  try {
    const res = await fetch("/api/favourites/" + recipe_id, {
      method: "DELETE",
    });
    if (!res.ok) {
      throw new Error(res.statusText);
    } else {
      return;
    }
  } catch (e) {
    throw new Error(e);
  }
}

//GET a recipe by its ID
async function GET_UserTesting() {
  let user;
  try {
    const res = await fetch("/api/user", { method: "GET" });
    if (!res.ok) {
      throw new Error(res.statusText);
    }
    user = await res.json();
  } catch (e) {
    throw new Error(e);
  }
  return new User(...Object.values(user));
}

const API = {
  GET_Ingredients,
  GET_RecipeByID,
  GET_RecipeByIngredients,
  GET_FavouritesByUserID,
  POST_Favourites,
  DELETE_Favourites,
  GET_UserTesting,
};
export default API;
