import logo from './logo.svg';
import './App.css';
import MainComp from './comps/basicComps/mainComp';
import { useState } from "react";
import {AppContext} from './context/context'

function App() {
  const [auth, setAuth] = useState({});
  return (
    <div className="App">
      <AppContext.Provider value={{auth,setAuth}} >
        <MainComp />
       </AppContext.Provider>
    </div>
  );
}

export default App;
