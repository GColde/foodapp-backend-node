import { ObjectId } from "mongodb";
import mongoose from "mongoose";

const RecipiesSchema = new mongoose.Schema({
  title: { type: String, required: true },
  ingredients: { type: [String], required: true },
  steps: { type: [String], required: true },
  url: { type: String, required: true },
  source: { type: String, required: true },
  ingredientsClean: { type: [ObjectId], ref: "ingredients", required: true },
  website: { type: String, required: true },
  photo: { type: String, default: null },
});

export const RecipiesModel = mongoose.model("recipes", RecipiesSchema);
export const createRecapie = (values: Record<string, any>) =>
  new RecipiesModel(values).save().then((data) => data.toObject());
