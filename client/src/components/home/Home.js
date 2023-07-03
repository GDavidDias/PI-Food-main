import { useDispatch, useSelector } from "react-redux";
import style from "./Home.module.css";
import * as actions from "../../redux/actions";
import Cards from "../cards/Cards";
import { useEffect, useState } from "react";



function Home(){
    //?----TRAIGO LOS ESTADOS GLOBALES
    const recipes = useSelector((state)=>state.filterRecipes);
    const pageItemsGlobal = useSelector((state)=>state.pageItems);
    const firstIndexGlobal = useSelector((state)=>state.firstIndex);
    const currentPageGlobal = useSelector((state)=>state.currentPage);

    //?---ESTADO LOCAL PARA PAGINADO CON ESTADOS GLOBALES
    const [pageItems, setPageItems] = useState(pageItemsGlobal);
    const [currentPage, setCurrentPage] = useState(currentPageGlobal);
    const [item, setItems] = useState([...recipes].splice(firstIndexGlobal,pageItems));
    

    const nextPage = () => {
        //?AL PRESIONAR BOTON PARA PAGINA SIGUIENTE
        const next_page = currentPage +1;
        const firstIndex = next_page * pageItems;
        if(firstIndex>=recipes.length) return;
        //?ACTUALIZO ESTADOS GLOBALES DE FIRSTINDEX Y CURRENTPAGE
        dispatch(actions.setFirstIndexGlobal(firstIndex));
        setItems([...recipes].splice(firstIndex,pageItems));
        setCurrentPage(next_page);
        dispatch(actions.setCurrentPageGlobal(next_page));
    };

    const prevPage = () => {
        //?AL PRESIONAR BOTON PAGINA ANTERIOR
        const prev_page = currentPage-1;
        const firstIndex = prev_page * pageItems;
        if(prev_page<0) return;
        //?ACTUALIZO ESTADOS GLOBALES DE FIRSTINDEX Y CURRENTPAGE
        dispatch(actions.setFirstIndexGlobal(firstIndex));
        setItems([...recipes].splice(firstIndex,pageItems));
        setCurrentPage(prev_page);
        dispatch(actions.setCurrentPageGlobal(prev_page));
    };

    const handleChange = (event) =>{
        //console.log("entra a handleChange")
        //?SI CAMBIA CANTIDAD DE ITEMS POR PAGINA
        //?REGRESO A LA PRIMER PAGINA X NUEVA PAGINACION
        const {name, value} = event.target;
        setPageItems(value);
        setCurrentPage(0)
        //?ACTUALIZO ESTADOS GLOBALES para ir a primer pagina.
        dispatch(actions.setCurrentPageGlobal(0));
        dispatch(actions.setFirstIndexGlobal(0));
    };
 
    const dispatch = useDispatch();


    //?SI CAMBIA ESTADO DE PAGINA GLOBAL, PREGUNTO SI ES LA PRIMER
    //?PAGINA Y PAGINO DE NUEVO
    useEffect(async()=>{
        if(currentPageGlobal===0){
            setCurrentPage(0);
            await setItems([...recipes].splice(firstIndexGlobal,pageItemsGlobal));
        } 
    },[currentPageGlobal])


    //?AL MODIFICARSE LA LISTA DE RECETAS POR ALGUN FILTRO
    //?SE PAGINA DE NUEVO
    useEffect(()=>{
        console.log("Entra useEffect - recipes <Home>")
        setItems([...recipes].splice(firstIndexGlobal,pageItems));
    },[recipes]);

    useEffect(()=>{
        //?AL CAMBIAR PAGEITEMS, ACTUALIZO ESTADO GLOBAL
        console.log("Entra a useEffect - pageItems <Home>", pageItems)
        dispatch(actions.addAllRecipes());
        dispatch(actions.addAllDiets());   
        //console.log("cambio estado global de pageItemsGlobal")
        dispatch(actions.setPageItemsGlobal(pageItems));
    },[pageItems])

    useEffect(async()=>{
        console.log(">>>> SE MONTA HOME")
        //?AL MONTAR TRAIGO ITEMS POR PAGINA Y PAGINO SEGUN
        //?FIRSTINDEX Y PAGEITEMS, PARA MANTENER LA PAGINACION
        //console.log("que trae pageItemsGlobal:",pageItemsGlobal)
        setPageItems(pageItemsGlobal);
        //console.log("seteo con firstIndexGlobal")
        await setItems([...recipes].splice(firstIndexGlobal,pageItemsGlobal));
    },[])


    return(
        <div className={style.container}>
            {/* ----- PAGINADO -----*/}
            <div className={style.navPage}>
                <label name="numberPage">page: {currentPage+1}/{Math.ceil(recipes.length/pageItems)}</label>
                <button onClick={()=>prevPage()}>Prev</button>
                <button onClick={()=>nextPage()}>Next</button>
                <input 
                    name="numberItem" 
                    type="number" 
                    value={pageItems}
                    onChange={handleChange}
                    ></input>
            </div>
            {/* ----- CONTENEDOR DE CARDS ----- */}
            <div className={style.cardsContainer}>
                <Cards recipes={item} />
            </div>
        </div>
    )
};

export default Home;