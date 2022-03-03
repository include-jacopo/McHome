"use strict";

const sqlite = require("sqlite3");
const db = new sqlite.Database("recipes.db", (err) => {
  if (err) throw err;
});

//Returns all the ingredients
exports.listIngredients = () => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM ingredients";
    db.all(sql, [], (err, rows) => {
      if (err) {
        reject(err);
        return;
      }
      const ingredients = rows.map((i) => {
        return {
          ingredient_id: i.ingredient_id,
          ingredient_name: i.ingredient_name,
        };
      });
      resolve(ingredients);
    });
  });
};

exports.findIngredientsByString = (searchString) => {
  return new Promise((resolve, reject) => {
    const sql = `SELECT * from ingredients WHERE ingredient_name LIKE '${searchString}%'`;
    db.all(sql, [], (err, rows) => {
      if (err) {
        reject(err);
        return;
      }
      const ingredients = rows.map((i) => {
        return {
          ingredient_id: i.ingredient_id,
          ingredient_name: i.ingredient_name,
        };
      });
      resolve(ingredients);
    });
  });
};

exports.listRecipes = () => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM recipes";
    db.all(sql, [], async (err, rows) => {
      if (err) {
        reject(err);
        return;
      }
      var recipes = await Promise.all(
        rows.map(async (i) => {
          const recipe = await this.getRecipeByID(i.recipe_id);
          return recipe;
        })
      );
      resolve(recipes);
    });
  });
};

exports.getRecipeByID = (recipe_id) => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM recipes WHERE recipe_id=?";
    db.get(sql, [recipe_id], async (err, row) => {
      if (err) {
        reject(err);
        return;
      }
      if (row === undefined) {
        resolve({ error: "Recipe not found" });
      } else {
        const recipe = {
          recipe_id: row.recipe_id,
          recipe_name: row.recipe_name,
          recipe_desc: row.recipe_desc,
          recipe_course: row.recipe_course,
          recipe_cost: row.recipe_cost,
          recipe_time: row.recipe_time,
        };
        const img_path = await getImagePathById(row.img_id);
        recipe.img_path = img_path;
        const ingredients = await getIngredientsInRecipe(recipe_id);
        recipe.ingredients = ingredients;
        const user_id = 0; //mock user_id
        const favourite = await isInFavourites(recipe_id, user_id);
        recipe.favourite = favourite;
        resolve(recipe);
      }
    });
  });
};

exports.getRecipesByIngredients = (ingredient_ids, filters) => {
  return new Promise((resolve, reject) => {
    var sql = `SELECT DISTINCT r1.recipe_id
    FROM recipes as r1, recipe_ingredient as ri1
    WHERE r1.recipe_id=ri1.recipe_id and ingredient_id=${ingredient_ids[0]}`;

    if (ingredient_ids.length > 1) {
      for (let i = 1; i < ingredient_ids.length; i++) {
        sql += `
        INTERSECT
    SELECT DISTINCT r2.recipe_id
    FROM recipes as r2, recipe_ingredient as ri2
    WHERE r2.recipe_id=ri2.recipe_id and ingredient_id=${ingredient_ids[i]}`;
      }
    }
    if (filters.time) {
      sql = sql + ` AND recipe_time=${filters.time}`;
    }
    if (filters.cost) {
      sql = sql + ` AND recipe_cost=${filters.cost}`;
    }
    if (filters.course) {
      sql = sql + ` AND recipe_course=${filters.course}`;
    }
    db.all(sql, [], async (err, rows) => {
      if (err) {
        console.log(err);
        reject(err);
        return;
      }
      var recipes = await Promise.all(
        rows.map(async (i) => {
          const recipe = await this.getRecipeByID(i.recipe_id);
          return recipe;
        })
      );
      resolve(recipes);
    });
  });
};

exports.getFavoritesByUserID = (user_id) => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT recipe_id FROM favourites WHERE user_id=?";
    db.all(sql, [user_id], async (err, rows) => {
      if (err) {
        reject(err);
        return;
      }
      var recipes = await Promise.all(
        rows.map(async (i) => {
          const recipe = await this.getRecipeByID(i.recipe_id);
          return recipe;
        })
      );
      resolve(recipes);
    });
  });
};

exports.addFavourite = (recipe_id, user_id) => {
  return new Promise((resolve, reject) => {
    const sql = "INSERT INTO favourites(recipe_id, user_id) VALUES (?,?)";
    db.run(sql, [recipe_id, user_id], function (err) {
      if (err) {
        reject(err);
        return;
      }
      resolve(null);
    });
  });
};

exports.removeFavourite = (recipe_id, user_id) => {
  return new Promise((resolve, reject) => {
    const sql = "DELETE FROM favourites WHERE recipe_id=? AND user_id=? ";
    db.run(sql, [recipe_id, user_id], function (err) {
      if (err) {
        reject(err);
        return;
      }
      resolve(null);
    });
  });
};

const getIngredientsInRecipe = (recipe_id) => {
  return new Promise(async (resolve, reject) => {
    const sql = "SELECT * FROM recipe_ingredient WHERE recipe_id=?";
    db.all(sql, [recipe_id], async (err, rows) => {
      if (err) {
        reject(err);
        return;
      }
      var ingredients = await Promise.all(
        rows.map(async (i) => {
          const res = await getIngredientsById(i.ingredient_id);
          return {
            ingredient_id: i.ingredient_id,
            quantity: i.quantity,
            ingredient_name: res.ingredient_name,
          };
        })
      );
      resolve(ingredients);
    });
  });
};

const getIngredientsById = (ingredient_id) => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM ingredients WHERE ingredient_id=?";
    db.get(sql, [ingredient_id], (err, row) => {
      if (err) {
        reject(err);
        return;
      }
      if (row === undefined) {
        resolve({ error: "Ingredient not found" });
      } else {
        const ingredient = {
          ingredient_id: row.ingredient_id,
          ingredient_name: row.ingredient_name,
        };
        resolve(ingredient);
      }
    });
  });
};

const getImagePathById = (img_id) => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM images WHERE img_id=?";
    db.get(sql, [img_id], (err, row) => {
      if (err) {
        reject(err);
        return;
      }
      if (row === undefined) {
        resolve({ error: "Image not found" });
      } else {
        const imagePath = row.img_path;
        resolve(imagePath);
      }
    });
  });
};
const isInFavourites = (recipe_id, user_id) => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM favourites WHERE recipe_id=? AND user_id=?";
    db.get(sql, [recipe_id, user_id], (err, row) => {
      if (err) {
        reject(err);
        return;
      }
      if (row === undefined) {
        resolve(false);
      } else {
        resolve(true);
      }
    });
  });
};

exports.getUserTesting = () => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM users WHERE user_id=?";
    db.get(sql, [0], async (err, row) => {
      if (err) {
        reject(err);
        return;
      }
      if (row === undefined) {
        resolve({ error: "User not found" });
      } else {
        const user = {
          user_id: row.user_id,
          username: row.username,
          email: row.email,
          first_name: row.first_name,
          last_name: row.last_name,
        };
        resolve(user);
      }
    });
  });
};
