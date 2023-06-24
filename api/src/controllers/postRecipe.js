//ENDPOINT QUE SE PUEDEN USAR
//--> Con COMPLEXSEARCH
//https://api.spoonacular.com/recipes/complexSearch?addRecipeInformation=true&number=100&apiKey=18912b78c29243fc963cc5fe2408851d

//--> Con Search By ID
//https://api.spoonacular.com/recipes/716429/information?apiKey=18912b78c29243fc963cc5fe2408851d&addRecipeInformation=true

//18912b78c29243fc963cc5fe2408851d

const axios = require("axios");
require('dotenv').config();
const {API_URL, API_KEY} = process.env;
const { Recipe, Op } = require("../db.js");

const postRecipe = async function(req,res){
    console.log("ingresa a postRecipe")
    
    const {title,image,summary,healthScore,sourceUrl,diet} = req.body;
    if(!title || !image || !summary || !healthScore || !sourceUrl) return res.status(401).send("Falta enviar datos obligatorios");
    // console.log("datos por body -id : ",id);
    // console.log("datos por body -title : ",title);
    // console.log("datos por body -image : ",image);
    // console.log("datos por body -summary : ",summary);
    // console.log("datos por body -healthScore : ",healthScore);
    // console.log("datos por body -sourceUrl : ",sourceUrl);
    // console.log("datos por body -diet : ",diet);
    try{

        //INSERTO NUEVA RECETA A BD
        const newRecipe = await Recipe.create({title,image,summary,healthScore,sourceUrl});
        //CARGAMOS LA TABLA INTERMEDIA Y ASOCIAMOS LA/S DIETA
        //La dieta viene como arreglo en diet, por body
        //Se carga primero la tabla diets
        await newRecipe.addDiet(diet);
            
        return res.status(200).json(newRecipe);

    }catch(error){
        res.status(401).send("Error en alguno de los datos provistos")
    }
}

module.exports = postRecipe;