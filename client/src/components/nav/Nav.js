import style from "./Nav.module.css";
import SearchBar from "../searchBar/SearchBar";
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
                        ?<SearchBar /> 
                        :null
                    }
                </div>
            </div>
        </div>
    )
};
