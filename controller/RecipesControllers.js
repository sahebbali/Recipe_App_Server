const  mongoose =require( "mongoose");
const  RecipesModel = require("../models/Recipes.js");
const  UserModel = require("../models/Users.js");
const  verifyToken= require('../utils/verify.js');

  
exports.GetRecipe= async (req, res) => {
    try {
        const result = await RecipesModel.find({});
        res.status(200).json(result);
      } catch (err) {
        res.status(500).json(err);
      }
}
exports.CreateNewRecipe=async (req, res) => {
    const recipe = new RecipesModel({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        image: req.body.image,
        ingredients: req.body.ingredients,
        instructions: req.body.instructions,
        imageUrl: req.body.imageUrl,
        cookingTime: req.body.cookingTime,
        userOwner: req.body.userOwner,
      });
      console.log(recipe);
    
      try {
        const result = await recipe.save();
        res.status(201).json({
          createdRecipe: {
            name: result.name,
            image: result.image,
            ingredients: result.ingredients,
            instructions: result.instructions,
            _id: result._id,
          },
        });
      } catch (err) {
        // console.log(err);
        res.status(500).json(err);
      }
}

exports.GetRecipeById= async (req, res) => {
    try {
        const result = await RecipesModel.findById(req.params.recipeId);
        res.status(200).json(result);
      } catch (err) {
        res.status(500).json(err);
      }
}
exports.SaveRecipe= async (req, res) => {
    const recipe = await RecipesModel.findById(req.body.recipeID);
    const user = await UserModel.findById(req.body.userID);
    try {
      user.savedRecipes.push(recipe);
      await user.save();
      res.status(201).json({ savedRecipes: user.savedRecipes });
    } catch (err) {
      res.status(500).json(err);
    }
}
exports.GetSaveRecipe= async (req, res) => {
    try {
        const user = await UserModel.findById(req.params.userId);
        const savedRecipes = await RecipesModel.find({
          _id: { $in: user.savedRecipes },
        });
    
        console.log(savedRecipes);
        res.status(201).json({ savedRecipes });
      } catch (err) {
        console.log(err);
        res.status(500).json(err);
      }
}
exports.GetIdOfSaveRecipe= async (req, res) => {
    try {
        const user = await UserModel.findById(req.params.userId);
        res.status(201).json({ savedRecipes: user?.savedRecipes });
      } catch (err) {
        console.log(err);
        res.status(500).json(err);
      }
}


  