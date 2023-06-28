import { Link } from "react-router-dom";
import style from "./Card.module.css";

export default function Card(props){
    //console.log("Entra a Card, que trae props: ", props)
    return(
        <div className={style.divCard}>
            <Link to={`/detail/${props.id}`}>
                <h3>{props.title}</h3>
            </Link>
            <img src={props.image} alt='' />
            <h4 className={style.health}>{props.healthScore}</h4>
            <h3>Dietas</h3>
            <ul>
                {props.diets?.map((name,index)=>(
                    <li key={index}>{name}</li>
                ))}
            </ul>
        </div>
    )
};