import style from "./Card.module.css";

export default function Card(props){
    //console.log("Entra a Card, que trae props: ", props)
    return(
        <div className={style.divCard}>
            <h3>{props.title}</h3>
            <img src={props.image} alt='' />
            <h3>Dietas</h3>
            <ul>
                {props.diets?.map((name,index)=>(
                <li key={index}>{name}</li>
                ))}
            </ul>
        </div>
    )
};