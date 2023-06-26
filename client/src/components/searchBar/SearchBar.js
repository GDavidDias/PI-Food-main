import { useState } from "react";
import style from "./SearchBar.module.css";
import { useSelector } from "react-redux";

export default function SearchBar(prop){

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
            <p>{errormsg}</p>
            <input
                type='search'
                name='search'
                onChange={handleChange}
            />
            <button onClick={()=>prop.onSearch(name)}>Buscar</button>
        </div>
    )
};