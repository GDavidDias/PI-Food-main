import axios from "axios";
import { ADD_ALL , SEARCH_RECIPES, ERROR, ORDER, ADD_ALL_DIETS, FILTER} from "./types";
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