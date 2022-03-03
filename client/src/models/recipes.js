function Recipe(recipe_id, recipe_name, recipe_desc, recipe_course, recipe_cost, recipe_time, img_path, ingredients, favorite) {
    this.recipe_id = recipe_id
    this.recipe_name = recipe_name;
    this.recipe_desc = recipe_desc;
    this.recipe_course = recipe_course;
    this.recipe_cost = recipe_cost;
    this.recipe_time = recipe_time;
    this.img_path = img_path;
    this.ingredients = ingredients;
    this.favorite = favorite;
}

export {Recipe};