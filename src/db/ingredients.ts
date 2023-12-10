import mongoose from "mongoose";

const Ingredients = new mongoose.Schema({
  title: { type: String, require: true },
});
export const IngredientsModel = mongoose.model("ingredients", Ingredients);

export const createIngredient = async (values: string) => {
  const exists = await IngredientsModel.exists({ title: `${values}` });
  if (!exists) {
    console.log("NEradau ir pridedu:", exists);
    return new IngredientsModel({ title: values }).save();
  } else {
    console.log("Radau:", exists);
    return IngredientsModel.findOne({ title: `${values}` });
  }
};

export const getIngredientByTitle = (ingr: string) =>
  IngredientsModel.findOne({ title: ingr });

export const getManyIngredients = (IngredientTiles: string[]) =>
  IngredientsModel.find().where("title").in(IngredientTiles);

export const getIngredients = () => IngredientsModel.find();
