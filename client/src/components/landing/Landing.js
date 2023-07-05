import style from "./Landing.module.css";
import useImg from "../../imagenes/imagen-comidas.png"
import { NavLink } from "react-router-dom";

export default function Landing(prop){
    return(
        <div className={style.contenedor}>
            <h1>Bienvenidos a Henry-Food</h1>
            <p>Una aplicacion con informacion sobre las comidas mas conocidas del mercado</p>
            <br></br>
            <button className={style.button}>
                <NavLink to={"/home"}>INGRESAR</NavLink>
            </button>
            <br></br>
            <img className ={style.imagen} src={useImg} alt="imagen-comidas"/>
            <p>Aplicacion creada por guillermo david dias para el proyecto individual - carrera FullStack - Henry</p>
        </div>
    )
};