import './App.css';
import { useState, useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Landing from './components/landing/Landing.js';
import Nav from './components/nav/Nav';
import Cards from './components/cards/Cards';
//import { addAllRecipes } from './redux/actions';
import * as actions from './redux/actions';
import { useDispatch, useSelector } from 'react-redux';


function App() {

  const recipes = useSelector((state)=>state.allRecipes)
  console.log("que trae useSelector: ", recipes)
  
  const location = useLocation();

  const dispatch = useDispatch();

  useEffect(()=>{
    console.log("entra a useEffect")
    //despues de montar el componente, setear las recetas
    dispatch(actions.addAllRecipes());
  },[])

  const onSearch = async (value)=>{
    dispatch(actions.searchRecipes(value));
  }

  return (
    <div className="App">
      <div>
        {location.pathname!=='/' ?<Nav onSearch={onSearch}></Nav> :null}
      </div>
      <div>
        <Routes>
          <Route exact path='/' element={<Landing/>} />
          <Route exact path='/home' element=
            {<Cards
              recipes={recipes}
            />} 
          />
        </Routes>
      </div>
    </div>
  )
};

export default App;
