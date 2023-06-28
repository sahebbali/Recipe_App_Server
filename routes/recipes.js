const express= require("express");
const RecipesControllers = require('../controller/RecipesControllers')
const router = express.Router();
const verifyToken =require('../utils/verify')


router.get("/", RecipesControllers.GetRecipe);

// Create a new recipe
router.post("/", RecipesControllers.CreateNewRecipe);

// Get a recipe by ID
router.get("/:recipeId", RecipesControllers.GetRecipeById);

// Save a Recipe
router.put("/", RecipesControllers.SaveRecipe);

// Get id of saved recipes
router.get("/savedRecipes/ids/:userId", RecipesControllers.GetIdOfSaveRecipe);

// Get saved recipes
router.get("/savedRecipes/:userId", RecipesControllers.GetSaveRecipe);

module.exports=router;
