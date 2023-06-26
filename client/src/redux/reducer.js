import { ADD_ALL, SEARCH_RECIPES, ERROR } from "./types";

const initialState = {
    allRecipes:[],
    error:"Barra de busqueda"
}

const reducer = (state=initialState, action)=>{
    console.log("entra al reducer -allRecipes: ", state.allRecipes);
    console.log("que trae action -allRecipes: ", action);
    switch (action.type) {
        case ADD_ALL:
            return{
                ...state,
                allRecipes: action.payload
            };
        case SEARCH_RECIPES:
            return{
                allRecipes: action.payload,
                error:"Recetas encontradas"
            };
        case ERROR:
            return{
                allRecipes:action.payload,
                error:"No hay recetas que coincidan con este nombre"
            }
        default: return {...state};
    };
    
};

export default reducer;