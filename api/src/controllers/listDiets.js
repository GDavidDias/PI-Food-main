//ENDPOINT QUE SE PUEDEN USAR
//--> Con COMPLEXSEARCH
//https://api.spoonacular.com/recipes/complexSearch?addRecipeInformation=true&number=100&apiKey=18912b78c29243fc963cc5fe2408851d

//--> Con Search By ID
//https://api.spoonacular.com/recipes/716429/information?apiKey=18912b78c29243fc963cc5fe2408851d&addRecipeInformation=true

//18912b78c29243fc963cc5fe2408851d

const axios = require("axios");
require('dotenv').config();
const {API_URL, API_KEY, API_LOCAL_HOST, IS_API_LOCAL} = process.env;

const { Diet } = require("../db.js");

//!------------------ARMA LISTA DE DIETAS-----------------
const listDiets = async function(req,res){
    console.log("ingresa a listDiets")
    
    //const {idRecipe} = req.params;
    //console.log("parametro recibido: ",idRecipe);
    try{
        // console.log("ingresa a try")
        // console.log(IS_API_LOCAL)
        let resp;
        
        if(IS_API_LOCAL==='true'){
            //API LOCAL
            resp = await axios (`${API_LOCAL_HOST}/complexSearch?addRecipeInformation=true&number=100&apiKey=${API_KEY}`);
        }else{
            //API EXTERNA
            resp = await axios (`${API_URL}/complexSearch?addRecipeInformation=true&number=100&apiKey=${API_KEY}`);
        }

        //console.log("axios trae en listDiets: ",resp.data.results);
        if(resp){
            let listrecipes = resp.data.results;
            let listadieta =[]
            //?RECORRO LAS RECETAS
            listrecipes.map((recipe)=>{
                //?RECORRO LA DIETA DE CADA RECETA, PORQUE ES UN ARREGLO
                //console.log("recetas y dietas: ",recipe.diets);
                recipe.diets.forEach(diet => {
                    if(!listadieta.includes(diet)){
                        listadieta.push(diet);
                    }
                });
            });
            //Mapeo solo el nombre de la dieta
            const listFilter=listadieta.map((diet)=> {
                return {name:diet}
            });
            
            // console.log("antes de crear")
            // console.log(listFilter);

            //?CUENTO SI HAY DIETAS CARGADAS, SINO LAS CARGO.
            let cantidadregistros = await Diet.count();
            // console.log("que trae diets: ",cantidadregistros);
            let allDiets
            if(cantidadregistros===0){
                allDiets = await Diet.bulkCreate(listFilter);
            }else{
                allDiets = await Diet.findAll();
            }
            return res.status(200).json(allDiets);
    
        }else{
            return res.status(404).send("No se encontraron datos de Dietas");
        }
    }catch(error){
        res.status(404).send("Error en la insercion de la tabla Diets", error.message);
    }
}

module.exports = listDiets;