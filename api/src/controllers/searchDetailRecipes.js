//ENDPOINT QUE SE PUEDEN USAR
//--> Con COMPLEXSEARCH
//https://api.spoonacular.com/recipes/complexSearch?addRecipeInformation=true&number=100&apiKey=18912b78c29243fc963cc5fe2408851d

//--> Con Search By ID
//https://api.spoonacular.com/recipes/716429/information?apiKey=18912b78c29243fc963cc5fe2408851d&addRecipeInformation=true

//18912b78c29243fc963cc5fe2408851d

const axios = require("axios");
require('dotenv').config();
const {API_URL, API_KEY, API_LOCAL_HOST, IS_API_LOCAL} = process.env;
const { Recipe, Op } = require("../db.js");

const searchDetailRecipes = async function(req,res){
    console.log("ingresa a detailRecipes")
    let detailRecipe = {}
    const {idRecipe} = req.params;
    console.log("parametro recibido: ",idRecipe);
    if(!idRecipe) return res.status(401).send("Falta enviar idRecipe");
    try{
        let respApi
        if(IS_API_LOCAL === 'true'){
            //BUSCA EN API LOCAL
            //console.log(`${API_LOCAL_HOST}/${idRecipe}/information?apiKey=${API_KEY}&addRecipeInformation=true`);
            respApi = await axios (`${API_LOCAL_HOST}/${idRecipe}/information?apiKey=${API_KEY}&addRecipeInformation=true`)
        }else{
            //BUSCA EN API EXTERNA
            respApi = await axios (`${API_URL}/${idRecipe}/information?apiKey=${API_KEY}&addRecipeInformation=true`)
        }

        //console.log("axios trae: ",resp);
        if(respApi){
            const {id,title,image,summary,healthScore,sourceUrl} = respApi.data;
            detailRecipe = {id,title,image,summary,healthScore,sourceUrl}
            return res.status(200).send(detailRecipe);
        }

        //BUSCA EN BD
        const respBd = await Recipe.findByPk(idRecipe);
        if(respBd){
            const {id,title,image,summary,healthScore,sourceUrl} = respBd;
            detailRecipe = {id,title,image,summary,healthScore,sourceUrl}
            return res.status(200).send(detailRecipe);
        }

        return res.status(401).send(`El codigo: ${idRecipe} no corresponde a una Receta existente`)

    }catch(error){
        res.status(401).send("Error en la busqueda de Recetas", error.message)
    }
}

module.exports = searchDetailRecipes;