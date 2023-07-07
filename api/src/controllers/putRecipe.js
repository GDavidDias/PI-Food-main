require('dotenv').config();
const { Recipe, Op } = require("../db.js");

//!------------------ACTUALIZA RECETA-----------------
const putRecipe = async function(req,res){
    console.log("ingresa a putRecipe")
    
    const {idRecipe} = req.params;
    console.log("parametro recibido: ",idRecipe);
    
    const {title,image,summary,healthScore,steps,diets} = req.body;
    if(!title || !summary || !healthScore || !steps ||!diets) return res.status(401).send("Falta enviar datos obligatorios");
    
    //?SI NO VIENE IMAGEN NO SE PASA VALOR, POR TENER VALOR POR DEFECTO
    let objUpd={}
    if(image===""){
        objUpd={title,summary,healthScore,steps}
    }else{
        objUpd={title,image,summary,healthScore,steps}
    }

    // console.log("datos por body -title : ",title);
    // console.log("datos por body -image : ",image);
    // console.log("datos por body -summary : ",summary);
    // console.log("datos por body -healthScore : ",healthScore);
    // console.log("datos por body -steps : ",steps);
    // console.log("datos por body -diet : ",diets);
    try{
        //?ACTUALIZO BD SEGUN ID y SU TABLA RELACIONADA
        await Recipe.findByPk(idRecipe)
            .then(recipe=>{
                //console.log("que trae recipe de findByPk ", recipe)
                if(recipe){
                    //?ACTUALIZO DATOS DE RECETA
                    return recipe.update(objUpd)
                }
                throw new Error("Receta no encontrada");
            })
            .then(recipe=>{
                //?ACTUALIZO DATOS DE TABLA RALACIONADA
                return recipe.setDiets(diets);
            })
            .then(()=>{
                console.log("Recetas y Dietas Actualizadas");
            })
            .catch(error =>{
                console.log("Error al ACTUALIZAR recetas y dietas ", error)
            })
            
        return res.status(200).json("Receta ACTUALIZADA exitosamente");

    }catch(error){
        res.status(401).send("Error en ACTUALIZACION de datos")
    }
}

module.exports = putRecipe;