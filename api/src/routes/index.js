const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const listDiets = require('../controllers/listDiets');
const searchRecipes = require('../controllers/searchRecipes');
const postRecipe = require('../controllers/postRecipe');
const searchDetailRecipes = require('../controllers/searchDetailRecipes');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get("/recipes/:idRecipe",searchDetailRecipes);
// router.get("/recipes/:idRecipe",(req,res)=>{
//     //console.log(req)
//     const {idRecipe} = req.params;
//     //console.log("qeu trae id: ",idRecipe);

//     res.status(200).send(`Entra a .get idRecipe: ${idRecipe}`);
// })
router.get("/diets",listDiets);

router.get("/recipes",searchRecipes);

router.post("/recipes",postRecipe);


module.exports = router;
