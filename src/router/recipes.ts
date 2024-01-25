import express from "express";
import { fromIngredientstoRecipes } from "../controllers/recipes";

export default (router: express.Router) => {
  router.get("/recipeinfo", fromIngredientstoRecipes);
};
