import './App.css'

import {BrowserRouter, Routes, Route} from "react-router-dom"
import Cadastro from './pages/Cadastro'
import Login from './pages/Login'
import Pessoa from './pages/Pessoa'
import ListaPessoas from './pages/ListaPessoas'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login/>}/>
          <Route path='/cadastro' element={<Cadastro/>}/>
          <Route path='/pessoas' element={<Pessoa/>}/>
          <Route path="/lista-pessoas" element={<ListaPessoas />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
