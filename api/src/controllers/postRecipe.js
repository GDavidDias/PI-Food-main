require('dotenv').config();
const { Recipe, Op } = require("../db.js");

//!------------------CARGA RECETA-----------------
const postRecipe = async function(req,res){
    console.log("ingresa a postRecipe")
    
    const {title,image,summary,healthScore,steps,diets} = req.body;
    if(!title || !summary || !healthScore || !steps) return res.status(401).send("Falta enviar datos obligatorios");
    
    //?SI NO VIENE IMAGEN NO SE PASA VALOR, POR TENER VALOR POR DEFECTO
    let objCreated={}
    if(image===""){
        objCreated={title,summary,healthScore,steps}
    }else{
        objCreated={title,image,summary,healthScore,steps}
    }

    // console.log("datos por body -title : ",title); //"..."
    // console.log("datos por body -image : ",image); // "..."
    // console.log("datos por body -summary : ",summary); //"..."
    // console.log("datos por body -healthScore : ",healthScore); // "52"
    // console.log("datos por body -steps : ",steps); // [ {number, step}, {number, step}, {number, step}]
    // console.log("datos por body -diet : ",diets); // [ 2, 5 ]
    try{

        //?INSERTO NUEVA RECETA A BD
        const newRecipe = await Recipe.create(objCreated);
        //?CARGAMOS LA TABLA INTERMEDIA Y ASOCIAMOS LA/S DIETA
        //?La dieta viene como arreglo en diet, por body, por eso se carga primero la tabla diets
        await newRecipe.addDiet(diets);
            
        return res.status(200).json("Receta creada exitosamente");

    }catch(error){
        res.status(401).send("Error en alguno de los datos provistos")
    }
}

module.exports = postRecipe;