import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import style from "./SearchBar.module.css";
import { useSelector } from "react-redux";
import * as actions from '../../redux/actions';

export default function SearchBar(prop){

    console.log("que trae prop SearchBar: ",prop)

    //?TRAIGO ESTADOS GLOBALES
    const dietList = useSelector((state)=>state.allDiets)
    const dietGlobal = useSelector((state)=>state.diet)
    const orderGlobal = useSelector((state)=>state.order)
    const nameGlobal = useSelector((state)=>state.recipeSearch)
    // console.log("que trae estado global diet: ", dietGlobal)
    // console.log("que trae estado global order: ", orderGlobal)

    //?ESTADO LOCAL DE FILTROS PARA APLICAR Y COMBINARLOS
    //?SETEADOS CON VALORES DEL ESTADO GLOBAL
    const [filtro, setFiltro] = useState({
        diet:dietGlobal,
        order:orderGlobal
    });

    //?ESTADO LOCAL DE NOMBRE DE RECETA A BUSCAR
    //?SETEADO CON VALOR DEL ESTADO GLOBAL <recipeSearch>
    const[name,setName]=useState(nameGlobal);

    const dispatch = useDispatch();

    //!AL SELECCIONAR UN ORDEN
    const handleOrder = (event)=>{
        console.log("entra a handleOrder con value", event.target.value)
        setFiltro({
            ...filtro,
            order:event.target.value
        });
        //?ACTUALIZO ESTADO GLOBAL DE ORDEN Y ORDENO RECIPES EN ESTADO GLOBAL
        dispatch(actions.orderCards(event.target.value));
    };

    //!AL SELECCIONAR UN FILTRO
    const handleFilter = (event)=>{
        console.log("entra a handleFilter con value", event.target.value)
        setFiltro({
            ...filtro,
            diet:event.target.value
        });
        //?ACTUALIZO ESTADO GLOBAL DE FILTRO Y FILTRO RECIPES EN ESTADO GLOBAL
        dispatch(actions.filterCard(event.target.value));
        if(orderGlobal!=="") dispatch(actions.orderCards(orderGlobal));

        //?ACTUALIZO ESTADO GLOBAL DE PAGINACION A PRIMER PAGINA
        dispatch(actions.setCurrentPageGlobal(0));
        dispatch(actions.setFirstIndexGlobal(0));
    }

    const errormsg = useSelector((state)=>state.error);


    //!AL ESCRIBIR EN EL INPUT DE BUSQUEDA DE NOMBRE
    const handleChange=event=>{
        const {value}=event.target;
        console.log("entra a handleChange con value", value)
        // ()=>prop.onSearch(value); 
        //?ACTUALIZO ESTADO LOCAL DE NOMBRE RECETA A BUSCAR
        setName(value);
        //?ACTUALIZO ESTADO GLOBAL DE recipeSearch
        dispatch(actions.setRecipeSearchGlobal(value));
    }

    const handleSearch=()=>{
        dispatch(actions.searchRecipes(name));
    }

    useEffect(async ()=>{
        console.log("ENTRA A USE EFFECT - FILTRO <SearcBar>")
        console.log("que trae filtro: ",filtro);
        // if(filtro.diet!=="") await dispatch(actions.filterCard(filtro.diet));
        // if(filtro.order!=="") await dispatch(actions.orderCards(filtro.order));

    },[filtro]);

    useEffect(async()=>{
        console.log(">>>> SE MONTA SEARCHBAR")
        console.log("que trae estado global diet: ", dietGlobal)
        console.log("que trae estado global order: ", orderGlobal)
    },[])

    return(
        <div className={style.divSearch}>
            {/* BUSCA RECETAS */}
            <div className={style.navSearch}>
                <div>
                    <p>{errormsg}</p>
                </div>
                <div className={style.navtextbutton}>
                    <input
                        type='search'
                        name='search'
                        onChange={handleChange}
                        value={name}
                    />
                    {/* <button onClick={()=>prop.onSearch(name)}>Buscar</button> */}
                    <button onClick={handleSearch}>Buscar</button>
                </div>
            </div>
            {/* FILTROS */}
            <div className={style.filterContainer}>
                <div>
                    <p>Filtros</p>
                </div>
                <div>
                    <select value={filtro.diet} 
                     onChange={handleFilter}
                    >
                        <option value="all" selected>All</option>
                        <option disabled>---Filtro de dietas:</option>
                        {
                            dietList?.map((diet)=>(
                                <option key={diet.id} value={diet.name}>{diet.name}</option>
                            ))
                        }
                        <option disabled>---Filtro de datos:</option>
                        <option value="API">API</option>
                        <option value="Local">Local</option>
                    </select>
                    <select value={filtro.order} 
                     onChange={handleOrder}
                    >
                        <option selected>--Seleccione Orden:</option>
                        <option value="A">Ascendente</option>
                        <option value="D">Descendente</option>
                        <option value="HS+">Comida Saludable +/-</option>
                        <option value="HS-">Comida Saludable -/+</option>
                    </select>
                </div>
            </div>
        </div>
    )
};