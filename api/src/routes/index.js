const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const listDiets = require('../controllers/listDiets');
const searchRecipes = require('../controllers/searchRecipes');
const postRecipe = require('../controllers/postRecipe');
const searchDetailRecipes = require('../controllers/searchDetailRecipes');
const deleteRecipe = require('../controllers/deleteRecipe');
const putRecipe = require('../controllers/putRecipe');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get("/recipes/:idRecipe",searchDetailRecipes);

router.get("/diets",listDiets);

router.get("/recipes",searchRecipes);

router.post("/recipes",postRecipe);

//?Agrego para borrar una receta creada en BD
router.delete("/delete/:idRecipe",deleteRecipe);

//!PARA ACTUALIZAR RECETA
router.put("/recipes/:idRecipe",putRecipe);


module.exports = router;
