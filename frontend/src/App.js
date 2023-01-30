import './App.css';

import Header from "./components/Header"
import Homepage from "./pages/Homepage"
import Registerpage from './pages/Registerpage';
import Loginpage from './pages/Loginpage';
import {BrowserRouter, Routes, Route } from "react-router-dom"


export default function App() {
  return <BrowserRouter>
  <Header/>
  <Routes>
    <Route path= "/"element= {<Homepage/>}/>
    <Route path= "/register"element= {<Registerpage/>}/>
    <Route path= "/login"element= {<Loginpage/>}/>
  </Routes>
  </BrowserRouter>
}