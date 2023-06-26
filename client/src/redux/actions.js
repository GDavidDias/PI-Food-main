import axios from "axios";
import { ADD_ALL , SEARCH_RECIPES, ERROR} from "./types";
  const URL = 'http://localhost:3001';

//ACTION -> addAllRecipes
export const addAllRecipes = () => async(dispatch)=>{
    console.log("entra a action addAllRecipes")
    //const endpoint = `${URL}/complexSearch?addRecipeInformation=true&number=10&apiKey=${API}`;
    // const endpoint = `${URL}/recipes`;
    const {data} = await axios.get(`${URL}/recipes/`);
    //console.log("que trae axios.get")
    //console.log(response);
    // const response = [
    //   {id:1,name:"carne con salchichas"},
    //   {id:2,name:"arroz con pollo"},
    //   {id:3,name:"sopa de caracol"},
    //   {id:4,name:"empanadas"},
    // ]
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