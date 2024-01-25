import { ObjectId } from "mongodb";
import express from "express";
import google from "googlethis";
import { RecipiesModel } from "../db/recipes";
import { getManyIngredients } from "../db/ingredients";

export const fromIngredientstoRecipes = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    // console.log("---------------NEW BATCH---------------");
    const ingredientsReq = req.query;
    if (typeof ingredientsReq.ingredients === "string") {
      const ingList = await getManyIngredients(
        ingredientsReq.ingredients.split(",")
      );
      const idArray: ObjectId[] = [];
      ingList.forEach((item) => {
        idArray.push(item._id);
      });
      const recipe = await RecipiesModel.findOne()
        .where("ingredientsClean")
        .in(idArray);

      if (recipe.photo) {
        console.log("RADO FOTKE");
        // console.log(recipe);
        return res.status(200).json(recipe);
      } else {
        console.log("NERADO FOTO");
        recipe.photo = await imageFromScraper(recipe.title);
        recipe.save();
        return res.status(200).json(recipe);
      }
    } else res.status(402);
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
};

const imageFromScraper = async (recipeName: string) => {
  try {
    // console.log("---------------NEW PHOTO---------------");

    if (typeof recipeName === "string") {
      const googlePhoto = await google.image(recipeName, { safe: false });

      const goodPhoto = googlePhoto.find((photo) => {
        return (
          (photo.width >= 1000 && photo.height >= 700) ||
          (photo.height >= 1000 && photo.width >= 700)
        );
      });
      return goodPhoto.url;
    } else return null;
  } catch (error) {
    console.log(error);
  }
};
