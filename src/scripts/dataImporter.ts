import fs from "fs";
import mongoose from "mongoose";
import { parse } from "csv-parse";
import { createRecapie } from "../db/recipes";
import { createIngredient } from "../db/ingredients";

const MONGO_URL = "mongodb://localhost:27017/foodweb";
const smallCSV = "./files/recepies_small.csv";
const bigCSV = "./files/recipes_data.csv";

mongoose.Promise = Promise;
mongoose.connect(MONGO_URL);
mongoose.connection.on("error", (error: Error) => console.log(error));

fs.createReadStream(smallCSV)
  .pipe(parse({ delimiter: ",", from: 2 }))
  .on("data", async function (row: string[]) {
    const ingredients = JSON.parse(row[1]);
    const steps = JSON.parse(row[2]);
    const ingredientsClean: string[] = JSON.parse(row[5]);
    const ingredientIds: string[] = [];
    for await (const ingredient of ingredientsClean) {
      const doc = await createIngredient(ingredient);
      ingredientIds.push(doc.id);
    }

    const object = {
      title: row[0],
      ingredients,
      steps,
      url: row[3],
      source: row[4],
      ingredientsClean: ingredientIds,
      website: row[6],
    };

    createRecapie(object);
  })
  .on("end", () => {
    console.log("BAIGIAU");
  });

// mongoose.connection.close();
