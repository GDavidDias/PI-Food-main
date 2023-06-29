// import style from "./Nav.module.css";

// import { useDispatch } from "react-redux";
import SearchBar from "../searchBar/SearchBar";
// import * as actions from '../../redux/actions';
import { Link, useLocation } from "react-router-dom";


export default function Nav(prop){

    const location = useLocation();

    // const dispatch = useDispatch();

    // const handleOrder = (event)=>{
    //     dispatch(actions.orderCards(event.target.value));
    // }

    // const handleFilter = (event)=>{
    //     dispatch(actions.filterCard(event.target.value));
    // }

    return(
        <div>
            <div>
                <Link to='/home'>
                    <button>Home</button>
                </Link>
                <Link to='/form'>
                    <button>Form</button>
                </Link>
            </div>
            <div>
                <div>
                    {location.pathname==='/home' 
                        ?<SearchBar onSearch={prop.onSearch} prop={prop}/> 
                        :null
                    }
                    
                </div>
                {/* <div>
                    <select onChange={handleFilter}>
                        <option value="all" selected>All</option>
                        <option disabled>---Filtro de dietas:</option>
                        {
                            prop.diets?.map((diet)=>(
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
                </div> */}
            </div>
        </div>
    )
};
