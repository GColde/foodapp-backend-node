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

// Recepto gavimas ir nuotraukos nustatymas jei nera jau pridetos nuotraukos

// Recepto nuotraukos radimas is API

// const imageFromScraper = async () => {
//   console.log("---------------NEW PHOTO---------------");
//   const googlePhoto = await google.image("Jewell Ball'S Chicken", {
//     safe: false,
//   });
//   console.log(googlePhoto);
//   const goodPhoto = googlePhoto.find((photo) => {
//     return (
//       (photo.width >= 1400 && photo.height >= 1000) ||
//       (photo.height >= 1400 && photo.width >= 1000)
//     );
//   });
//   console.log(goodPhoto);
//   return goodPhoto.url;
// };

// imageFromScraper();

// Recepto radimas ir nuotraukos nustatymas

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

//   if (!recipe.photo) {
//     recipe.photo = await imageFromScraper();
//     recipe.save();
//   }
// };

// fromIngredientstoRecipes();

// Code for testing photo key. Deleting key code
// const deletePhotoKey = async () => {
//   console.log("Deleting 'photo' key of objects");
//   await RecipiesModel.updateMany({}, { $unset: { photo: "" } });
// };

// deletePhotoKey();

RecipiesModel.updateMany({}, { $unset: { photo: "" } }).exec();
