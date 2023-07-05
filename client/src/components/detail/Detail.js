import axios from "axios";
import * as actions from "../../redux/actions";
import { useEffect, useState } from "react";
import style from "./Detail.module.css";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
const URL = 'http://localhost:3001';


export default function Detail(props){
    console.log("entra en Detail - que trae props: ", props)
    const {id} = useParams();
    console.log("Que viene en id: ", id);

    const [recipe, setRecipe] = useState({});

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const onDeleteRecipe = async(id)=>{
        await axios.delete(`http://localhost:3001/delete/${id}`)
        .then(async res=>{
            //?REINICIO ESTADO GLOBAL Y BORRO FILTROS Y ORDEN
            await dispatch(actions.resetGlobal());
            await dispatch(actions.addAllRecipes());
            await dispatch(actions.addAllDiets());
            alert(res.data)
            navigate('/home');
        })
        .catch(err=>alert(err))
    };

    //!prueba para editar una receta llamando a form
    const onEditRecipe = (id)=>{
        console.log("aqui editamos la receta")
        dispatch(actions.setUpdId(id));
        navigate('/form');
    }

    useEffect(async ()=>{
        try{
            const {data} = await axios.get(`${URL}/recipes/${id}`);
            console.log("Que trae data de axios: ",data)
            if(data.id){
                setRecipe(data);
            }else{
                window.alert('No hay recetas con ese id')
            }
        }catch(error){
            console.log("error en busqueda de recetas por id")
        }
    },[id]);

    useEffect(()=>{
        document.getElementById('ContenedorDescripcion').innerHTML=recipe.summary;
    },[recipe])
    //console.log("como setea recipes en Detail: ", recipe);

    
    return(
        <div className={style.container}>
            <div className={style.idHealtContainer}>
                <h1>{recipe.title ?recipe.title :null}</h1>
                <h3>ID | {recipe.id ?recipe.id :null}</h3>
                <h3>HEALT | ❤️{recipe.healthScore ?recipe.healthScore :null}</h3>
            </div>
            <div className={style.descriptionContainer}>
                <h3>Descripcion:</h3>
                <div id="ContenedorDescripcion"></div>
                
            </div>
            <div className={style.imageContainer}>
                <img src={recipe.image ?recipe.image :null} alt={recipe.title}/>
            </div>
            <div className={style.tiposDietaContainer}>
                <h3>Tipos de Dieta:</h3>
                <h3>
                    {
                        new Intl.ListFormat("es").format(recipe.diets)
                    }
                </h3>
            </div>
            <div className={style.pasosContainer}>
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
            <div className={style.deleteUpdateContainer}>
                <div>
                    <button
                        type="button"
                        disabled={isNaN(id) ?false :true}
                        onClick={()=>onDeleteRecipe(id)}
                    >Eliminar Receta</button>
                </div>
                <div>
                    <button
                        type="button"
                        disabled={isNaN(id) ?false :true}
                        onClick={()=>onEditRecipe(id)}
                    >Editar Receta</button>
                </div>
            </div>
        </div>
    )
};