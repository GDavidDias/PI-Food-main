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

const searchRecipes = async function(req,res){
    console.log("ingresa a searchRecipes")
    const { name } = req.query;
    if(!name) return res.status(401).send("Falta enviar dato")
    
    
    try{
        //console.log("que trae query: ",name)
        let resp
        if(IS_API_LOCAL === 'true'){
            //API_LOCAL
            resp = await axios (`${API_LOCAL_HOST}/complexSearch?addRecipeInformation=true&number=100&apiKey=${API_KEY}`);
        }else{
            //API EXTERNA
            resp = await axios (`${API_URL}/complexSearch?addRecipeInformation=true&number=100&apiKey=${API_KEY}`)
        }

        //FORMATEA DATOS DE API
        const list = resp.data.results;
        const listRecipes = list.map((recipe)=>{
            return{id:recipe.id,
                title:recipe.title,
                image:recipe.image,
                summary:recipe.summary,
                healthScore:recipe.healthScore,
                sourceUrl:recipe.sourceUrl}
        });
        //FILTRA DATOS DE API - SIN CASE SENSITIVE
        const recipesFilter = listRecipes.filter((recipe)=>{
            return recipe.title.toLowerCase().includes(name.toLowerCase());
        });

        //BUSCA EN BD
        const recipesFind = await Recipe.findAll({
            where: {
                title:{
                    [Op.iLike] : `%${name}%`
                }
            }
        });
        console.log("que trae recipesFind: ")
        console.log(recipesFind)
        const recipesFindFilter = recipesFind.map((recipe)=>{
            return{id:recipe.id,
                title:recipe.title,
                image:recipe.image,
                summary:recipe.summary,
                healthScore:recipe.healthScore,
                sourceUrl:recipe.sourceUrl}
        });

        console.log("que trae recipesFindFilter: ")
        console.log(recipesFindFilter)

        const recipesSearch = recipesFilter.concat(recipesFindFilter);

        recipesSearch.length
            ?res.status(200).json(recipesSearch)
            :res.status(401).send("No existen recetas con ese nombre")

        
    }catch(error){
        res.status(401).send(error.message)
    }
}

module.exports = searchRecipes;