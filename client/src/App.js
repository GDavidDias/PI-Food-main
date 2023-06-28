import './App.css';
import { useState, useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Landing from './components/landing/Landing.js';
import Nav from './components/nav/Nav';
import Cards from './components/cards/Cards';
import * as actions from './redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import Detail from './components/detail/Detail';


function App() {

  const recipes = useSelector((state)=>state.filterRecipes)
  console.log("que trae useSelector -allRecipes: ", recipes)

  const diets = useSelector((state)=>state.allDiets)
  console.log("que trae useSelector -allDiets: ", diets)
  
  const location = useLocation();

  const dispatch = useDispatch();

  useEffect(()=>{
    console.log("entra a useEffect")
    //despues de montar el componente, setear las recetas
    dispatch(actions.addAllRecipes());
    dispatch(actions.addAllDiets());
  },[dispatch])

  const onSearch = async (value)=>{
    dispatch(actions.searchRecipes(value));
  }

  return (
    <div className="App">
      <div>
        {location.pathname!=='/' ?<Nav onSearch={onSearch} diets={diets}></Nav> :null}
      </div>
      <div>
        <Routes>
          <Route exact path='/' element={<Landing/>} />
          <Route exact path='/home' element=
            {<Cards
              recipes={recipes}
            />} 
          />
          <Route exact path='/detail/:id' element={<Detail/>} />
        </Routes>
      </div>
    </div>
  )
};

export default App;
