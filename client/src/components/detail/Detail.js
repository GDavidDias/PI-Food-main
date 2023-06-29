import axios from "axios";
import { useEffect, useState } from "react";
import style from "./Detail.module.css";
import { useParams } from "react-router-dom";
const URL = 'http://localhost:3001';

export default function Detail(props){
    console.log("entra en Detail - que trae props: ", props)
    const {id} = useParams();
    console.log("Que viene en id: ", id);

    const [recipe, setRecipe] = useState({});

    useEffect(async ()=>{
        try{
            const {data} = await axios.get(`${URL}/recipes/${id}`);
            console.log("Que trae data de axios: ",data)
            if(data.id){
                setRecipe(data);
            }else{
                window.alert('No hay presonajes con ese id')
            }
        }catch(error){
            console.log("error en busqueda de recetas por id")
        }
    },[id]);

    useEffect(()=>{
        document.getElementById('ContenedorDescripcion').innerHTML=recipe.summary;
    },[recipe])
    console.log("como setea recipes en Detail: ", recipe);

    
    return(
        <div>
            <div>
                <h1>{recipe.title ?recipe.title :null}</h1>
                <h3>ID | {recipe.id ?recipe.id :null}</h3>
                <h3>HEALT | {recipe.healthScore ?recipe.healthScore :null}</h3>
            <div>
                <h3>Descripcion:</h3>
                <div id="ContenedorDescripcion"></div>
                
            </div>
            </div>
            <div>
                <img src={recipe.image ?recipe.image :null} alt={recipe.title}/>
            </div>
            <div>
                <h3>Tipos de Dieta:</h3>
                <h3>
                    {
                        new Intl.ListFormat("es").format(recipe.diets)
                    }
                </h3>
            </div>
            <div>
                <h3>PASO A PASO:</h3>
                <ul>{
                    recipe.steps?.map((step,index)=>(
                        <li key={index}>
                            Paso: {step.number} - 
                            Descripcion: {step.step}
                        </li>
                    )) 
                }
                </ul>
            </div>
        </div>
    )
};