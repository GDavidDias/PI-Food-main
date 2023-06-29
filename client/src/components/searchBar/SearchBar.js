import { useDispatch } from "react-redux";
import { useState } from "react";
import style from "./SearchBar.module.css";
import { useSelector } from "react-redux";
import * as actions from '../../redux/actions';

export default function SearchBar(prop){

    console.log("que trae prop SearchBar: ",prop)

    const dispatch = useDispatch();

    const handleOrder = (event)=>{
        dispatch(actions.orderCards(event.target.value));
    }

    const handleFilter = (event)=>{
        dispatch(actions.filterCard(event.target.value));
    }

    const errormsg = useSelector((state)=>state.error);

    const[name,setName]=useState("");

    const handleChange=event=>{
        const {value}=event.target;
        console.log(value);
        // ()=>prop.onSearch(value);
        setName(value);
    }

    return(
        <div className={style.divSearch}>
            <div>
                <p>{errormsg}</p>
                <input
                    type='search'
                    name='search'
                    onChange={handleChange}
                />
                <button onClick={()=>prop.onSearch(name)}>Buscar</button>
            </div>
            <div>
                <div>
                    <select onChange={handleFilter}>
                        <option value="all" selected>All</option>
                        <option disabled>---Filtro de dietas:</option>
                        {
                            prop.prop.diets?.map((diet)=>(
                                <option key={diet.id} value={diet.name}>{diet.name}</option>
                            ))
                        }
                        <option disabled>---Filtro de datos:</option>
                        <option value="API">API</option>
                        <option value="Local">Local</option>
                    </select>
                    <select onChange={handleOrder}>
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