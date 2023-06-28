import Card from "../card/Card";
import style from "./Cards.module.css";

export default function Cards({recipes}){
    console.log("Entra a Cards")
    //console.log("que trae recipes: ", recipes)
    return(
        <div className={style.listCards}>
            {
                recipes?.map((recipe)=>(
                    <Card
                        key={recipe.id}
                        id={recipe.id}
                        title={recipe.title}
                        image={recipe.image}
                        healthScore={recipe.healthScore}
                        diets={recipe.diets}
                    />
                ))
            }
        </div>
    )
};