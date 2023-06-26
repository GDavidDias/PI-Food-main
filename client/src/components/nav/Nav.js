// import style from "./Nav.module.css";

import SearchBar from "../searchBar/SearchBar";

export default function Nav(prop){
    return(
        <div>
            <h1>Nav</h1>
            <SearchBar
                onSearch={prop.onSearch}
            />
        </div>
    )
};
