import { ADD_ALL, SEARCH_RECIPES, ERROR, ORDER, ADD_ALL_DIETS, FILTER,SET_PAGEITEMS_GLOBAL,SET_FIRSTINDEX_GLOBAL,SET_CURRENTPAGE_GLOBAL , SET_RECIPESEARCH_GLOBAL, RESET, SET_UPD_ID,SET_ITEMS_GLOBAL} from "./types";

const initialState = {
    allRecipes:[],
    allDiets:[],
    filterRecipes:[],
    diet:"",
    order:"",
    recipeSearch:"",
    error:"Barra de busqueda",
    pageItems:9,
    firstIndex:0,
    currentPage:0,
    itemsPage:[],
    arrayPage:[],
    updId:"" //!variable de id para update
}

const reducer = (state=initialState, action)=>{
    // console.log("entra al reducer -allRecipes: ", state.allRecipes);
    // console.log("que trae action -allRecipes: ", action);
    switch (action.type) {
        case SET_ITEMS_GLOBAL:
            console.log("Ingresa a SET_ITEMS_GLOBAL - REDUCER");
            const newItemsPage = [...state.filterRecipes].splice(state.firstIndex,state.pageItems);
            console.log("que trae nuevo itemsPage: ", newItemsPage)

            const newArrayPage = [];
            for(let i=1;i<=Math.ceil(state.filterRecipes.length/state.pageItems);i++){
                newArrayPage.push(i);
            }
            console.log("como se arma arraypage: ", newArrayPage);
            return{
                ...state,
                itemsPage:newItemsPage,
                arrayPage:newArrayPage
            };
        case RESET:
            return{
                ...state,
                diet:"",
                order:"",
                recipeSearch:""
            };
        case ADD_ALL:
            //console.log("que trae payload, luego de ADD_ALL: ", action.payload)
            //?SI NO HAY FILTRO Y ORDEN APLICADO, ES LA PRIMERA VEZ
            if(state.diet==="" && state.order===""&&state.recipeSearch===""){
                return{
                    ...state,
                    allRecipes: action.payload,
                    filterRecipes: action.payload
                }
            }else{
                //?SI HAY FILTRO, ORDEN O BUSQUEDA APLICADO, RETORNO RECIPES FILTRADO
                return{...state}
            }

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
            console.log("ingresa a order -REDUCER: ", action.payload);
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
                order:action.payload,
                filterRecipes:orderAllRecipes
            };
        case FILTER:
            console.log("ingresa a filter -REDUCER: ", action.payload);
            let filterAllRecipes=[];
            if(action.payload==='all'){
                filterAllRecipes=[...state.allRecipes];
            }else if(action.payload==='API'){
                filterAllRecipes=state.allRecipes.filter((recipe)=> typeof(recipe.id) === "number");
            }else if(action.payload==='Local'){
                filterAllRecipes=state.allRecipes.filter((recipe)=> typeof(recipe.id) !== "number");
            }else{
                filterAllRecipes=state.allRecipes.filter((recipe)=>recipe.diets.includes(action.payload));
            }
            console.log(">> > cuantos registros hay luego del filtro: ", filterAllRecipes.length)
            if(filterAllRecipes.length===0){
                return{
                    ...state,
                    error:"No hay recetas que cumplan con este filtro",
                }
            }else{
                return{
                    ...state,
                    diet:action.payload,
                    filterRecipes:filterAllRecipes,
                    error:"Recetas encontradas"
                }
            };
        case SET_PAGEITEMS_GLOBAL:
            console.log("Ingresa a SET_PAGEITEMS_GLOBAL - REDUCER > action.payload: ", action.payload)
            return{
                ...state,
                pageItems:action.payload
            };
        case SET_FIRSTINDEX_GLOBAL:
            console.log("ingresa a SET_FIRSTINDEX_GLOBAL - REDUCER > action.payload: ", action.payload)
            return{
                ...state,
                firstIndex:action.payload
            };
        case SET_CURRENTPAGE_GLOBAL:
            console.log("ingrea a SET_CURRENTPAGE_GLOBAL - REDUCER > action.payload: ", action.payload)
            return{
                ...state,
                currentPage:action.payload
            };
        case SET_RECIPESEARCH_GLOBAL:
            console.log("Ingresa a SET_RECIPESEARCH_GLOBAL - REDUCER >action.payload: ", action.payload)
            return{
                ...state,
                recipeSearch:action.payload
            };
        case SET_UPD_ID:
            console.log("ingreso a SET_UPD_ID - REDUCER > action.payload", action.payload);
            return{
                ...state,
                updId:action.payload
            }
        default: return {...state};
    };
    
};

export default reducer;