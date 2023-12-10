import express from "express";
import {
  fromIngredientstoRecipes,
  imageFromScraper,
} from "../controllers/recipes";

export default (router: express.Router) => {
  router.get("/recipeinfo", fromIngredientstoRecipes);
  router.get("/recipephoto", imageFromScraper);
};
