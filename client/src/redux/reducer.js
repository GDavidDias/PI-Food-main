import { ADD_ALL, SEARCH_RECIPES, ERROR, ORDER, ADD_ALL_DIETS, FILTER } from "./types";

const initialState = {
    allRecipes:[],
    allDiets:[],
    filterRecipes:[],
    error:"Barra de busqueda"
}

const reducer = (state=initialState, action)=>{
    // console.log("entra al reducer -allRecipes: ", state.allRecipes);
    // console.log("que trae action -allRecipes: ", action);
    switch (action.type) {
        case ADD_ALL:
            console.log("que trae payload, luego de ADD_ALL: ", action.payload)
            return{
                ...state,
                allRecipes: action.payload,
                filterRecipes: action.payload
            };
        case SEARCH_RECIPES:
            return{
                ...state,
                allRecipes: action.payload,
                filterRecipes: action.payload,
                error:"Recetas encontradas"
            };
        case ERROR:
            return{
                ...state,
                filterRecipes:action.payload,
                error:"No hay recetas que coincidan con este nombre"
            };
        case ADD_ALL_DIETS:
            return{
                ...state,
                allDiets:action.payload
            };
        case ORDER:
            const orderAllRecipes = [...state.filterRecipes];
            if(orderAllRecipes.length>1){
                if(action.payload==='A'){
                    orderAllRecipes.sort((a,b)=>{
                        const titleA = a.title.toLowerCase();
                        const titleB = b.title.toLowerCase();
                        if(titleA<titleB) return -1;
                        if(titleA>titleB) return 1;
                        return 0;
                    })
                }else if(action.payload==='D'){
                    orderAllRecipes.sort((a,b)=>{
                        const titleA = a.title.toLowerCase();
                        const titleB = b.title.toLowerCase();
                        if(titleA>titleB) return -1;
                        if(titleA<titleB) return 1;
                        return 0;
                    })
                }else if(action.payload==='HS+'){
                    orderAllRecipes.sort((a,b)=>b.healthScore - a.healthScore);
                }else if(action.payload==='HS-'){
                    orderAllRecipes.sort((a,b)=>a.healthScore - b.healthScore);
                }
            }
            return{
                ...state,
                filterRecipes:orderAllRecipes
            };
        case FILTER:
            let filterAllRecipes=[];
            console.log("ingresa a filter: ", action.payload);
            if(action.payload==='all'){
                filterAllRecipes=[...state.allRecipes];
            }else if(action.payload==='API'){
                filterAllRecipes=state.allRecipes.filter((recipe)=> typeof(recipe.id) === "number");
            }else if(action.payload==='Local'){
                filterAllRecipes=state.allRecipes.filter((recipe)=> typeof(recipe.id) !== "number");
            }else{
                filterAllRecipes=state.allRecipes.filter((recipe)=>recipe.diets.includes(action.payload));
            }
            return{
                ...state,
                filterRecipes:filterAllRecipes,
            }
        default: return {...state};
    };
    
};

export default reducer;