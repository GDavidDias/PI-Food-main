require('dotenv').config();
const { Recipe, Op } = require("../db.js");

//!------------------CARGA RECETA-----------------
const postRecipe = async function(req,res){
    console.log("ingresa a postRecipe")
    
    const {title,image,summary,healthScore,steps,diets} = req.body;
    if(!title || !image || !summary || !healthScore || !steps) return res.status(401).send("Falta enviar datos obligatorios");

    // console.log("datos por body -title : ",title);
    // console.log("datos por body -image : ",image);
    // console.log("datos por body -summary : ",summary);
    // console.log("datos por body -healthScore : ",healthScore);
    // console.log("datos por body -steps : ",steps);
    // console.log("datos por body -diet : ",diets);
    try{

        //?INSERTO NUEVA RECETA A BD
        const newRecipe = await Recipe.create({title,image,summary,healthScore,steps});
        //?CARGAMOS LA TABLA INTERMEDIA Y ASOCIAMOS LA/S DIETA
        //?La dieta viene como arreglo en diet, por body, por eso se carga primero la tabla diets
        await newRecipe.addDiet(diets);
            
        return res.status(200).json("Receta creada exitosamente");

    }catch(error){
        res.status(401).send("Error en alguno de los datos provistos")
    }
}

module.exports = postRecipe;