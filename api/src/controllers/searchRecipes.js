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

//!------------------BUSCA RECETAS-----------------
//?Si el request viene sin query, se retorna todas las recetas
//?Si el request tiene como query parte del nombre, busca
const searchRecipes = async function(req,res){
    console.log("ingresa a searchRecipes")
    const { name } = req.query;
    //if(!name) return res.status(401).send("Falta enviar dato")
    
    try{
        //console.log("que trae query: ",name)
        let resp
        //?--BUSCA TODO EN API
        if(IS_API_LOCAL === 'true'){
            //API_LOCAL
            resp = await axios (`${API_LOCAL_HOST}/complexSearch?addRecipeInformation=true&number=100&apiKey=${API_KEY}`);
        }else{
            //API EXTERNA
            resp = await axios (`${API_URL}/complexSearch?addRecipeInformation=true&number=100&apiKey=${API_KEY}`)
        }

        //?--FORMATEA DATOS DE API
        //console.log("Formatea datos de API")
        const list = resp.data.results;
        const listRecipesApi = list.map((recipe)=>{
            return{id:recipe.id,
                title:recipe.title,
                image:recipe.image,
                healthScore:recipe.healthScore,
                diets:recipe.diets
                }
        });

        //?--BUSCA TODO EN BD
        //console.log("Busca en BD")
        const listBd = await Recipe.findAll({
            include:[{
                model: Diet,
                attributes:['name'],
            }],
        });
        // console.log("que trae recipesFind: ")
        //  console.log("que trae listBd: ",listBd)
        //  console.log("que trae listBd.diets: ", listBd.diets)
        //?--FORMATEA DATOS DE BD
        const listRecipesBd = listBd.map((recipe)=>{
            return{id:recipe.id,
                title:recipe.title,
                image:recipe.image,
                healthScore:recipe.healthScore,
                diets:recipe.diets.map(diet=>diet.name)
                }
        });
        // console.log("que trae recipesFindFilter: ")
        // console.log(listRecipesBd)

        //?---> UNIFICA ARREGLOS DE API Y BD FORMATEADOS
        const listAllRecipes = listRecipesApi.concat(listRecipesBd);        
        
        //console.log("que trae listRecipes: ", listRecipes)
        if(!name){
            //?SI NO VIENE NAME, DEVUELVE UN ARREGLO DE RECETAS PARA CARGA INICIAL
            console.log("retorna lista de recetas inicial")
            //console.log("que trae listRecipes: ", listRecipes)
            return res.status(200).json(listAllRecipes);
        }else{
            //?SI VIENE NAME, FILTRA EL NOMBRE EN EL ARREGLO UNIFICADO
            //?FILTRA DATOS  - SIN CASE SENSITIVE
            const recipesSearch = listAllRecipes.filter((recipe)=>{
                return recipe.title.toLowerCase().includes(name.toLowerCase());
            });

            recipesSearch.length
            ?res.status(200).json(recipesSearch) //? SI ENCONTRO RECETAS 
            :res.status(401).send("No existen recetas con ese nombre") //? SI NO ENCONTRO RECETAS
        };
                
    }catch(error){
        res.status(401).send(error.message);
    }
}

module.exports = searchRecipes;