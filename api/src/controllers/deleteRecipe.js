require('dotenv').config();
const { Recipe, Op } = require("../db.js");

//!------------------ELIMINA RECETA-----------------
const deleteRecipe = async function(req,res){
    console.log("ingresa a deleteRecipe")
    
    const {idRecipe} = req.params;
    console.log("parametro recibido: ",idRecipe);
    if(!idRecipe) return res.status(401).send("Falta enviar idRecipe");

    try{
        //?BUSCO REGISTRO EN BD
        const recipeDelete = await Recipe.findByPk(idRecipe);
        if(!recipeDelete) throw new Error("Registro no encontrado en BD");

        //?ELIMINO RECETA
        await recipeDelete.destroy();
                    
        return res.status(200).json("Receta ELIMINADA exitosamente");

    }catch(error){
        res.status(401).send("Error al ELIMINAR recetas", error.message);
    }
}

module.exports = deleteRecipe;