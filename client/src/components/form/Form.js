import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../redux/actions";
import style from "./Form.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


export default function Form(props){

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const dietsList = useSelector((state)=>state.allDiets)
    // console.log("que trae useSelector -allDiets: ", diets)

    //?----- ESTADOS LOCALES------
    const [form, setForm] = useState({
        title:"",
        summary:"",
        healthScore:"",
        steps:[],
        image:"",
        diets:[],
    });

    const [paso,setPasos] = useState("");

    const [estadoError, setEstadoError] = useState(true)

    const [dieta, setDieta] = useState([])

    const [error, setError] = useState({
        title:"",
        healthScore:"",
        diets:""
    })

    

    useEffect(()=>{
        console.log("que trae anyPropVacias: ", anyPropVacias(form))
        setEstadoError(allPropVacias(error)&&!anyPropVacias(form))
        // console.log("como esta error: ",error)
        console.log("que trae estadoError: ",estadoError)
        console.log("que trae estado form: ", form)
        console.log("que trae estado error: ", error)
        console.log("que trae estado dieta: ", dieta)
    },[error],[form],[dieta])

    const allPropVacias = (obj)=>{
        for (let propiedad in obj){
            if(obj[propiedad] !== "" && obj[propiedad].length !==0) return false;
        }
        return true;
    };

    const anyPropVacias = (obj)=>{
        for(let propiedad in obj){
            if(obj[propiedad] === "" || obj[propiedad].length === 0) return true;
        }
        return false;
    }

    const handleChange = (event) =>{
        const {name, value, selectedIndex} = event.target;
        // console.log("que trae name: ", name)
        // console.log("que trae value: ", value)        
        setForm({
            ...form,
            [name]:value
        });
        validate({
            ...form,
            [name]:value
        },name, value);
        
        //Actualizo estado de pasos y formateo
        if(name==='steps'){
            setPasos(value)
            // console.log(form.steps)
            formatStep(value)
        }

        if(name==='selectDiet'){
            if(!dieta.some((obj)=>obj.id === selectedIndex)){
                const objdiet = {
                    id:selectedIndex,
                    name:value
                }
                //?MODIFICO EL ESTADO DE DIETA, CON NUEVA DIETA
                setDieta([...dieta, {id:selectedIndex,name:value}])
                //dieta.push({id:selectedIndex,name:value});
                //form.diets.push(selectedIndex);
                //?--MODIFICO ESTADO DE FORM
                //?--copio el estado actual del form
                const formActual = {...form};
                //?--copio el arreglo de diets y agrego nueva dieta
                const arregloDietsForm =[...formActual.diets, selectedIndex];
                //?--actualizo el arreglo de dietas en el form actual
                formActual.diets = arregloDietsForm;
                //?--seteo el estado local de form para actualizarlo
                setForm(formActual);

                setError({...error,diets:""})
            }else{
                // setError({...error,diets:"No se pueden repetir dietas"})
            }
            // console.log("que trae estado dieta: ", dieta)
        }
        // console.log("que trae estado form: ", form)
        // console.log("que trae estado error: ", error)
        // console.log("que trae estado dieta: ", dieta)
    };


    //FORMATEO LOS PASO A PASO PARA CREAR ARREGLO DE OBJETOS
    const formatStep=(step)=>{
        const inputString = step;
        const stringArreglo = inputString.split(',');
        if(stringArreglo.length!==0){
            const objArreglo = stringArreglo.map((paso,index)=>{
                return {number:index+1,
                        step:paso}
            })
            setForm({...form,steps:objArreglo})
        }else{
            setForm({...form,steps:[{number:1,step:step}]})
        }
    }


    //VALIDACIONES
    const validate = (form,name, value) =>{

        if(name==='title'){
            if(/[0-9]/.test(form.title)){
                // console.log("entra valida title con error")
                // error.title="Error: el Nombre no puede contener numeros";
                setError({...error,title:"Error: el Nombre no puede contener numeros"});
            }else{
                setError({...error,title:""});
            }
        };

        if(name==='healthScore'){
            if(Number(form.healthScore) <1 || Number(form.healthScore) >100){
                //console.log("entra valida healtscore con error")
                //error.healthScore="Error: el valor debe estar en el rango de 1 y 100"
                setError({...error,healthScore:"Error: el valor debe estar en el rango de 1 y 100"});
            }else if(isNaN(Number(form.healthScore))){
                setError({...error,healthScore:"Debe ingresar un numero"})
            }else{
                setError({...error,healthScore:""});
            }
        }
    };


    const submitHandler = async(event)=>{
        event.preventDefault();
        await axios.post("http://localhost:3001/recipes/",form)
        .then(async res=>{
            //?REINICIO ESTADO GLOBAL Y BORRO FILTROS Y ORDEN
            await dispatch(actions.resetGlobal());
            await dispatch(actions.addAllRecipes());
            await dispatch(actions.addAllDiets());            
            //?REINICIO ESTADO LOCAL
            setForm({
                title:"",
                summary:"",
                healthScore:"",
                steps:[],
                image:"",
                diets:[],
            });
            setPasos("");
            setDieta([]);
            setError({
                title:"",
                healthScore:"",
                diets:""
            });

            alert(res.data)

            navigate('/home');
        })
        .catch(err=>alert(err))


    };

    const onDeleteDiets = ()=>{
        //PRESIONA EL BOTON BORRAR DIETAS
        if(dieta.length!=0){
            setDieta([]);
            setForm({
                ...form,
                diets:[]
            })
        }
    }

    return(
        <div>
            <h1>Cargar Nueva Receta</h1>
            <form onSubmit={submitHandler}>
            <div className={style.containerForm}>
                <div className={style.leftForm}>
                    <div className={style.platoContainer}>
                        <div className={style.platoNombre}>
                            <label>Nombre del Plato: </label><br/>
                            <input 
                                name="title" 
                                type="text" 
                                value ={form.title}
                                onChange={handleChange} />
                        </div>
                        <div className={style.msgError}>
                            {error.title && <p>{error.title}</p>}
                        </div>
                    </div>
                    <div className={style.healtContainer}>
                        <div className={style.healtNumber}>
                            <label>Comida Saludable: </label><br/>
                            <input 
                                name="healthScore" 
                                type="number" 
                                value={form.healthScore}
                                onChange={handleChange} />
                        </div>
                        <div className={style.msgError}>{error.healthScore && <p>{error.healthScore}</p>}</div>
                    </div>
                    <div className={style.resumenContainer}>
                        <label>Resumen: </label><br/>
                        <textarea
                            rows="10" cols="50"
                            name="summary" 
                            value ={form.summary}
                            onChange={handleChange}
                        ></textarea>
                    </div>
                    <div className={style.imgContainer}>
                        <div>
                            <label>Imagen:</label><br/>
                            <input
                                name="image"
                                value={form.image}
                                onChange={handleChange}
                            />
                        </div>
                        <div className={style.cuadroImagen}>
                            {form.image && <img src={form.image} alt="imagen"/>}
                        </div>
                    </div>
                </div>
                <div className={style.rightForm}>
                    <div className={style.steps}>
                        <label>Paso a Paso:</label>
                        <div>
                            <label>Ingrese los pasos separados por comas</label><br/>
                            <textarea
                                rows="8" cols="50"
                                name="steps"
                                value={paso}
                                onChange={handleChange}
                            ></textarea><br/>
                        </div>
                        <label>Pasos creados</label>
                        <div className={style.pasosCreados}>
                            {form.steps?.map((step,index)=><p key={index}>{step.number}: {step.step}</p>)}
                        </div>
                    </div>
                    <div className={style.diets}>
                        <div className={style.selectDiets}>
                            <label>Seleccione dietas: </label>
                            <div>
                                <select name='selectDiet' onChange={handleChange}>
                                    <option selected disabled value="predefinido">--Seleccione dietas--</option>
                                    {
                                        dietsList?.map((diet,index)=>(
                                        <option key={index} value={diet.name}>{diet.name}</option>
                                        ))
                                    }
                                </select>
                            </div>
                            <div className={style.buttonDiets}>
                                <button 
                                    type="button"
                                    disabled={dieta.length===0 ?true :false}
                                    onClick={()=>onDeleteDiets()}
                                >Borrar Dietas</button>
                            </div>
                        </div>
                        <div className={style.dietsContainer}>
                            {   dieta?.map((diet)=>(
                                    <p key={diet.id}>{diet.name}</p>
                                ))
                            }
                        </div>
                        <div className={style.msgError}>{error.diets && <p>{error.diets}</p>}</div>
                    </div>
                </div>
            </div>

                <button disabled={!estadoError} type="submit">SUBMIT</button>
            </form>
        </div>
    )
};