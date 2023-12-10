import mongoose from "mongoose";
import google from "googlethis";
import {
  getIngredients,
  getIngredientByTitle,
  getManyIngredients,
} from "../db/ingredients";
import { ObjectId } from "mongodb";
import { RecipiesModel } from "../db/recipes";

const MONGO_URL = "mongodb://localhost:27017/foodweb";

mongoose.Promise = Promise;
mongoose.connect(MONGO_URL);
mongoose.connection.on("error", (error: Error) => console.log(error));

// Ingridientu radimas bei perdavimas i recepta

// const ingredients = ["cream", "sugar"];

// const fromIngredientstoRecipes = async () => {
//   console.log("---------------NEW BATCH---------------");
//   const ingList = await getManyIngredients(ingredients);
//   const idArray: ObjectId[] = [];
//   ingList.forEach((item) => {
//     idArray.push(item._id);
//   });
//   const recipe = await RecipiesModel.findOne()
//     .where("ingredientsClean")
//     .in(idArray);
//   console.log(recipe);
// };

// fromIngredientstoRecipes();

// Recepto nuotraukos radimas

const imageFromScraper = async () => {
  console.log("---------------NEW PHOTO---------------");
  const googlePhoto = await google.image("The Wolf Among Us", { safe: true });
  // console.log(googlePhoto);
  const goodPhoto = googlePhoto.find((photo) => {
    return (
      (photo.width >= 1800 && photo.height >= 1200) ||
      (photo.height >= 1800 && photo.width >= 1200)
    );
  });
  console.log(goodPhoto);
};

imageFromScraper();
