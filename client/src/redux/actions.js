import axios from "axios";
import { ADD_ALL , SEARCH_RECIPES, ERROR, ORDER, ADD_ALL_DIETS, FILTER,SET_PAGEITEMS_GLOBAL,SET_FIRSTINDEX_GLOBAL,SET_CURRENTPAGE_GLOBAL , SET_RECIPESEARCH_GLOBAL, RESET, SET_UPD_ID,SET_ITEMS_GLOBAL} from "./types";
  const URL = 'http://localhost:3001';

//ACTION -> addAllRecipes
export const addAllRecipes = () => async(dispatch)=>{
    console.log("entra a action addAllRecipes")
    //const endpoint = `${URL}/complexSearch?addRecipeInformation=true&number=10&apiKey=${API}`;
    // const endpoint = `${URL}/recipes`;
    const {data} = await axios.get(`${URL}/recipes/`);
    //console.log("que trae axios.get")
    //console.log(response);
    return dispatch({
        type:ADD_ALL,
        payload:data,
    })
};

export const searchRecipes = (value) => async(dispatch)=>{
  console.log("ingresa a searchRecipes")
  try{
    const {data} = await axios.get(`${URL}/recipes/?name=${value}`);
    return dispatch({
      type:SEARCH_RECIPES,
      payload:data,
    })
  }catch(error){
    return dispatch({
      type:ERROR,
      payload:[]
    })
  }
};


export const addAllDiets = () => async (dispatch)=>{
  console.log("entra a action addAllDiets")
  try{
    const {data} = await axios.get(`${URL}/diets`);
    return dispatch({
      type:ADD_ALL_DIETS,
      payload:data
    })
  }catch(error){
    console.log("error en carga dietas")
  }
};

export const orderCards = (order)=>{
  return{
    type:ORDER,
    payload:order,
  }
};

export const filterCard = (filter)=>{
  return{
    type:FILTER,
    payload:filter
  }
};

export const setPageItemsGlobal = (pageItems)=>{
  return{
    type:SET_PAGEITEMS_GLOBAL,
    payload:pageItems
  }
}

export const setFirstIndexGlobal =(firstIndex) =>{
  return{
    type:SET_FIRSTINDEX_GLOBAL,
    payload:firstIndex
  }
}

export const setCurrentPageGlobal =(currentPage)=>{
  return{
    type:SET_CURRENTPAGE_GLOBAL,
    payload:currentPage
  }
}

export const setRecipeSearchGlobal =(recipeSearch)=>{
  return{
    type:SET_RECIPESEARCH_GLOBAL,
    payload:recipeSearch
  }
};

export const resetGlobal =()=>{
  return{
    type:RESET
  }
};

//!Action para update
export const setUpdId=(id)=>{
  return{
    type:SET_UPD_ID,
    payload:id
  }
};

//?paginacion global
export const setItemsGlobal = ()=>{
  return{
    type:SET_ITEMS_GLOBAL
  }
}