const mapTime = ["5-10 min", "10-25 min", "25+ min"];
const mapDish = ["Side Dish", "Main", "Second"];
const mapCost = ["Low €", "Medium €€", "High €€€"];
export { mapTime, mapDish, mapCost };

export const getMap = (title) => {
  switch (title) {
    case "Time":
      return mapTime;
    case "Dish":
      return mapDish;
    case "Cost":
      return mapCost;
    default:
      return [];
  }
};

export const mapToIndex = (title, value) => {
  let index = -1;
  switch (title) {
    case "Time":
      index = mapTime.indexOf(value);
      break;
    case "Dish":
      index = mapDish.indexOf(value);
      break;
    case "Cost":
      index = mapCost.indexOf(value);

      break;
    default:
      break;
  }
  if (index === -1) return undefined;
  else return index.toString();
};
