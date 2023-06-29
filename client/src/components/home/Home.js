import { useDispatch, useSelector } from "react-redux";
import style from "./Home.module.css";
import * as actions from "../../redux/actions";
import Cards from "../cards/Cards";
import { useEffect, useState } from "react";


function Home(){
    //TRAIGO LOS ESTADOS GLOBALES
    const recipes = useSelector((state)=>state.filterRecipes);

    //ESTADO LOCAL PARA PAGINADO
    const ITEMS_PER_PAGE = 9;
    const [pageItems, setPageItems] = useState(9);
    const [currentPage, setCurrentPage] = useState(0);
    const [item, setItems] = useState([...recipes].splice(0,pageItems));
    
    useEffect(()=>{
        setItems([...recipes].splice(0,pageItems));
    },[recipes]);

    const nextPage = () => {
        const next_page = currentPage +1;
        const firstIndex = next_page * pageItems;
        if(firstIndex>=recipes.length) return;
        setItems([...recipes].splice(firstIndex,pageItems));
        setCurrentPage(next_page);
    }

    const prevPage = () => {
        const prev_page = currentPage-1;
        const firstIndex = prev_page * pageItems;
        if(prev_page<0) return;
        setItems([...recipes].splice(firstIndex,pageItems));
        setCurrentPage(prev_page);
    };

    const handleChange = (event) =>{
        const {name, value} = event.target;
        console.log("que trae itempagina: ",value)
        setPageItems(value);
    };

    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(actions.addAllRecipes());
        dispatch(actions.addAllDiets());
    },[pageItems])

    return(
        <div className={style.container}>
            <div className={style.navPage}>
                <button onClick={()=>prevPage()}>Prev</button>
                <button onClick={()=>nextPage()}>Next</button>
                <input 
                    name="numberItem" 
                    type="number" 
                    value={pageItems}
                    onChange={handleChange}
                    ></input>
            </div>
            <div className={style.cardsContainer}>
                <Cards recipes={item} />
            </div>
        </div>
    )
};

export default Home;