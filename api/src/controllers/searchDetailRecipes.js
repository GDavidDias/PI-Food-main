//ENDPOINT QUE SE PUEDEN USAR
//--> Con COMPLEXSEARCH
//https://api.spoonacular.com/recipes/complexSearch?addRecipeInformation=true&number=100&apiKey=18912b78c29243fc963cc5fe2408851d

//--> Con Search By ID
//https://api.spoonacular.com/recipes/716429/information?apiKey=18912b78c29243fc963cc5fe2408851d&addRecipeInformation=true

//18912b78c29243fc963cc5fe2408851d

const axios = require("axios");
require('dotenv').config();
const {API_URL, API_KEY, API_LOCAL_HOST, IS_API_LOCAL} = process.env;
const { Recipe, Diet, Op } = require("../db.js");

//!------------------BUSCA DETALLE DE RECETA-----------------
const searchDetailRecipes = async function(req,res){
    console.log("ingresa a detailRecipes")
    let detailRecipe = {}
    const {idRecipe} = req.params;
    console.log("parametro recibido: ",idRecipe);
    //console.log("tipo dato: ",!isNaN(idRecipe)); 
    if(!idRecipe) return res.status(401).send("Falta enviar idRecipe");
    try{
        //?CONSULTO SI LA CLAVE PRINCIPAL ES NUMERO => API o UUID => BDD, y consulto respectivamente.
        if(!isNaN(idRecipe)){
            //?SI idRecipe ES NUMERO ->CONSULTO EN API
            console.log("busca en API")
            let respApi
            if(IS_API_LOCAL === 'true'){
                //BUSCA EN API LOCAL
                console.log("busco en api local")
                respApi = await axios (`${API_LOCAL_HOST}/${idRecipe}/information?apiKey=${API_KEY}&addRecipeInformation=true`)
                //console.log("axios trae: ",respApi.data);
            }else{
                //BUSCA EN API EXTERNA
                console.log("busco en api externa")
                respApi = await axios (`${API_URL}/${idRecipe}/information?apiKey=${API_KEY}&addRecipeInformation=true`)
                //console.log("axios trae: ",respApi.data);
            }
    
            if(respApi){
                const {id,title,image,summary,healthScore,analyzedInstructions,diets} = respApi.data;
                //console.log("que trae analyzedInstructions.steps: ",analyzedInstructions[0].steps)
                //analyzedInstructions -> SON LOS PASO A PASO DE LA RECETA
                //                     -> ES UN ARREGLO CON UN OBJETO, CON DOS PROPIEDADES -> "name" y "steps": aqui estan los pasos
                // "analyzedInstructions": [
                //     {
                //        "name": "",
                //        "steps": [{},{}]
                //     }
                //  ],

                detailRecipe = {id,
                                title,
                                image,
                                summary,
                                healthScore,
                                steps: analyzedInstructions.length!==0 ?analyzedInstructions[0].steps :[],
                                diets
                            }
                //console.log("que trae respApi: ", respApi.data);
                return res.status(200).json(detailRecipe);
            }else{
                return res.status(404).send(`No se encontraron datos en la API para el codigo: ${idRecipe}`);
            }

        }else{
            //?Como idRecipe no es NUMERO -> BUSCA EN BD
            console.log("Busca en BD")
            const respBd = await Recipe.findByPk(idRecipe,{
                include: Diet,
            });
            //console.log("que trae respBd: ",respBd)
            if(respBd){
                const {id,title,image,summary,healthScore,steps,diets} = respBd;
                //console.log("Como viene diets: ",diets?.map(diet=>diet.name))
                detailRecipe = {id,
                                title,
                                image,
                                summary,
                                healthScore,
                                steps,
                                diets: diets?.map(diet=>diet.name),
                            }
                return res.status(200).json(detailRecipe);
            }else{
                return res.status(404).send(`No se encontraron datos en la BD para el codigo: ${idRecipe}`);
            }
        }

    }catch(error){
        console.log("ingresa a ERROR");
        res.status(404).send("Error en la busqueda de Recetas", error.message)
    }
}

module.exports = searchDetailRecipes;