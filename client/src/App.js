import './App.css';
import { Route, Routes, useLocation } from "react-router-dom";
import Landing from './components/landing/Landing.js';
import Nav from './components/nav/Nav';
import * as actions from './redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import Detail from './components/detail/Detail';
import Form from './components/form/Form';
import Home from './components/home/Home';


function App() {

  // const recipes = useSelector((state)=>state.filterRecipes)
  // console.log("que trae useSelector -allRecipes: ", recipes)

  const diets = useSelector((state)=>state.allDiets)
  // console.log("que trae useSelector -allDiets: ", diets)
  
  const location = useLocation();

  const dispatch = useDispatch();

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
          <Route exact path='/home' element={<Home/>} />
          <Route exact path='/detail/:id' element={<Detail/>} />
          <Route exact path='/form' element={<Form/>} />
        </Routes>
      </div>
    </div>
  )
};

export default App;
