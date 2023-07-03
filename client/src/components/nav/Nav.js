import style from "./Nav.module.css";

// import { useDispatch } from "react-redux";
import SearchBar from "../searchBar/SearchBar";
// import * as actions from '../../redux/actions';
import { Link, useLocation } from "react-router-dom";


export default function Nav(prop){

    const location = useLocation();

    return(
        <div className={style.container}>
            <div className={style.navButtons}>
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
            </div>
        </div>
    )
};
