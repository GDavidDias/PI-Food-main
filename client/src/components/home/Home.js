import { useDispatch, useSelector } from "react-redux";
import style from "./Home.module.css";
import * as actions from "../../redux/actions";
import Cards from "../cards/Cards";
import { useEffect } from "react";

function Home(){
    //?----TRAIGO LOS ESTADOS GLOBALES
    const recipes = useSelector((state)=>state.filterRecipes);
    const pageItemsGlobal = useSelector((state)=>state.pageItems);
    const firstIndexGlobal = useSelector((state)=>state.firstIndex);
    const currentPageGlobal = useSelector((state)=>state.currentPage);
    const itemsGlobal = useSelector((state)=>state.itemsPage);

    const arrayPageGlobal = useSelector((state)=>state.arrayPage);

    const dispatch = useDispatch();

    const nextPage = () => {
        //?AL PRESIONAR BOTON PARA PAGINA SIGUIENTE
        const next_page = currentPageGlobal +1;
        const firstIndex = next_page * pageItemsGlobal;
        if(firstIndex>=recipes.length) return;
        //?ACTUALIZO ESTADOS GLOBALES DE FIRSTINDEX Y CURRENTPAGE
        //?y ACTUALIZO PAGINACION DE RECETAS
        dispatch(actions.setFirstIndexGlobal(firstIndex));
        dispatch(actions.setCurrentPageGlobal(next_page));
        dispatch(actions.setItemsGlobal());
    };

    const prevPage = () => {
        //?AL PRESIONAR BOTON PAGINA ANTERIOR
        const prev_page = currentPageGlobal-1;
        const firstIndex = prev_page * pageItemsGlobal;
        if(prev_page<0) return;
        //?ACTUALIZO ESTADOS GLOBALES DE FIRSTINDEX Y CURRENTPAGE
        //?Y ACTUALIZO PAGINACION DE RECETAS
        dispatch(actions.setFirstIndexGlobal(firstIndex));
        dispatch(actions.setCurrentPageGlobal(prev_page));
        dispatch(actions.setItemsGlobal());
    };

    //?AL PRESIONAR SOBRE BOTON PAGINA
    const setPage = (page)=>{
        //console.log("que trae page: ", page)
        const firstIndex = (page-1) * pageItemsGlobal;
        dispatch(actions.setFirstIndexGlobal(firstIndex));
        dispatch(actions.setCurrentPageGlobal(page-1));
        dispatch(actions.setItemsGlobal());
    };

    const handleChange = (event) =>{
        //?AL PRESIONAR CAMBIO ITEMS POR PAGINA
        //console.log("entra a handleChange")
        const {value} = event.target;
        dispatch(actions.setPageItemsGlobal(value));
        //?ACTUALIZO ESTADOS GLOBALES para ir a primer pagina.
        dispatch(actions.setCurrentPageGlobal(0));
        dispatch(actions.setFirstIndexGlobal(0));
        dispatch(actions.setItemsGlobal());
    };


    //?AL MODIFICARSE LA LISTA DE RECETAS POR ALGUN FILTRO
    //?SE PAGINA DE NUEVO
    useEffect(()=>{
        console.log("SI CAMBIA ESTADO RECETAS PAGINA NUEVO")
        dispatch(actions.setItemsGlobal());
    },[recipes]);


    //?AL MONTAR TRAIGO ITEMS POR PAGINA Y PAGINO SEGUN
    //?FIRSTINDEX Y PAGEITEMS, PARA MANTENER LA PAGINACION
    useEffect(()=>{
        console.log(">>>> SE MONTA HOME")
        dispatch(actions.addAllRecipes());
        dispatch(actions.addAllDiets());        
        dispatch(actions.setItemsGlobal());   
    },[])

    return(
        <div className={style.container}>
            {/* ----- PAGINADO -----*/}
            <div className={style.navPage}>
                <div className={style.pagesCont}>
                    <p name="numberPage">page: {currentPageGlobal+1}/{Math.ceil(recipes.length/pageItemsGlobal)}</p>
                </div>
                <button onClick={()=>prevPage()}>Prev</button>
                <button onClick={()=>nextPage()}>Next</button>
                <input 
                    name="numberItem" 
                    type="number" 
                    value={pageItemsGlobal}
                    onChange={handleChange}
                    ></input>
            </div>
            <div className={style.buttonPage}>
                {
                    arrayPageGlobal?.map((page, index)=>(
                        <button key={index} onClick={()=>setPage(page)}>{page}</button>
                    ))
                }
            </div>
            {/* ----- CONTENEDOR DE CARDS ----- */}
            <div className={style.cardsContainer}>
                <Cards recipes={itemsGlobal} />
            </div>
        </div>
    )
};

export default Home;