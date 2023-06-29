import { useDispatch, useSelector } from "react-redux";
import style from "./Home.module.css";
import * as actions from "../../redux/actions";
import Cards from "../cards/Cards";
import { useEffect } from "react";


function Home(){
    //TRAIGO LOS ESTADOS GLOBALES
    const recipes = useSelector((state)=>state.filterRecipes);
    
    const dispatch = useDispatch();
    
    useEffect(()=>{
        dispatch(actions.addAllRecipes());
        dispatch(actions.addAllDiets());
    },[])

    return(
        <div className={style.container}>
            <Cards recipes={recipes} />
        </div>
    )
};

export default Home;